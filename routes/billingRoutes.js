const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    if (!charge.paid) {
      return res.status(400).send({ error: "have not paid" });
    }
    console.log("charge", charge);
    req.user.credits += 5;
    //take the model and persist it to the database
    const user = await req.user.save();
    //we are sending the data we want to communicate to the browser
    res.send(user);
  });
};
