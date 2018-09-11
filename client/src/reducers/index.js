import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer';

const reducers = combineReducers({
    form: reduxForm,
    auth: authReducer

})
export default reducers 