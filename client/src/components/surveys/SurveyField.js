//SurveyField contains label and text input 
import React from 'react';
export default ({input, label, meta: {error, touched}})=>{
    //props.input
    //{...input} equals to onBlur={input.onBlur}
    // console.log('props', input )
    return ( 
        <div>
             <label>{label}</label>
            <input {...input} style={{marginBottom: "5px"}}/>
            <div className='red-text' style={{marginBottom: '20px'}}>{touched  && error}</div>
        </div>
    )
}

