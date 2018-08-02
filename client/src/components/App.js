import React from "react";
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import Header from './Header'
import Landing from './Landing'
//BrowserRouter looks at the url and changes the components that should be displayed depending on that url

const SurveyNew = () => <h2> SurveyNew </h2>
const Dashboard = () => <h2> Dashboard </h2>

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return <div className='container'>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route path='/surveys/new' component={SurveyNew} />
          <Route exact path='/surveys' component={Dashboard} />
        </div>
      </BrowserRouter>

    </div>
  }
}
export default connect(null, actions)(App)
