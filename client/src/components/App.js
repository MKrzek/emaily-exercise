import React from "react";
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index.js';
import Dashboard from './Dashboard'
import Header from './Header'
import Landing from './Landing'
import SurveyNew from './surveys/SurveyNew'
//BrowserRouter looks at the url and changes the components that should be displayed depending on that url



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
          <Route exact path='/surveys' component={Dashboard} />
          <Route path='/surveys/new' component={SurveyNew} />

        </div>
      </BrowserRouter>

    </div>
  }
}
export default connect(null, { fetchUser })(App)
