import React from 'react';
import _ from 'lodash'
import {connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions/index'


const SurveyFormReview =({onCancel, formValues})=>{
   const reviewFields= _.map(formFields, ({name, label})=>{
       //'field' one object from formFields; it can be destructured so that you get only 'label' and 'name'
       return (
           <div key={name}>
               <label>{label}</label>
               <div>{formValues[name]}</div>
           </div>
       )
   })

    return <div>
    <h4>Please confirm your entries </h4>
    {reviewFields}
    <button className='yellow darken-3 white-text btn-flat' onClick={onCancel}>Back</button>
    <button onClick={()=>this.props.submitSurvey(formValues)} type='submit' className='btn-flat white-text right green'>
    Send Survey
    <i className='material-icons right'>email</i>
    </button>
    
    </div>
}

function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    }
}
export default connect(mapStateToProps, actions)(SurveyFormReview)