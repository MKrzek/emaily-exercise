import React from 'react';
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField';
const FIELDS=[
    {name:'title', label:'Survey Title'},
    {name:'subject', label:'Subject Line'},
    {label:'Email Body', name:'body' },
    {label:'Recipient List', name:'emails'}];
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    }
}
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm)