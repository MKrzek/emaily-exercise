//SurveyField contains label and text input 
import React from 'react';
export default ({input, label})=>{
    //props.input
    //{...input} equals to onBlur={input.onBlur}
    console.log('props', input )
    return ( 
        <div>
             <label>{label}</label>
            <input {...input}/>
        </div>
    )
}

