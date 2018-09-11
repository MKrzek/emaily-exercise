import React from 'react';
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails'

const FIELDS=[
    {name:'title', label:'Survey Title'},
    {name:'subject', label:'Subject Line'},
    { name:'body', label:'Email Body' },
    {name:'emails', label:'Recipient List'}];

class SurveyForm extends React.Component {



    renderFields(){
            {/* <Field type='text' name='title' component={SurveyField} label='Survey Title'/> */}
          return _.map(FIELDS, ({label, name})=>{
              return <Field   key={name} component={SurveyField} type='text' label={label} name={name}/>
          })
    }

    render() {
        return <div>
            <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
               {this.renderFields()}
               <Link to='/surveys' className='red btn-flat left text-white'>Cancel</Link>
                <button   className='teal btn-flat right white-text' type='submit'>Next
                <i className='material-icons right'>done</i>
                </button>
            </form>
        </div>
    }
}
function validate (values){
    const errors={}
    errors.emails= validateEmails(values.emails||'')
    
    _.each(FIELDS, ({name, noError})=>{
        console.log('values[name]', values[name])
        if(!values[name]){
            errors[name]='You must provide a value'
        }
        

   })
    // if (!values.title){
    //     errors.title="You must provide a title"
    // }
    // if (!values.subject){
    //     errors.subject="You must provide a subject"
    // }
    // if(!values.body){
    //     errors.body="You must provide a content"
    // }
    return errors
}
export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm)