import React from 'react';
import _ from 'lodash'
import {connect } from 'react-redux';
import formFields from './formFields';


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
    <button className='yellow darken-3 btn-flat' onClick={onCancel}>Back</button>
    
    </div>
}

function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    }
}
export default connect(mapStateToProps)(SurveyFormReview)