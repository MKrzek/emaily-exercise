import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/index'
class SurveyList extends React.Component {
    renderSurveys(){
        return this.props.surveys.reverse().map(survey=>{
            return <div className='card blue-grey darken-1' key={survey._id}>
                    <div className='card-content '>
                     <span className='card-title'>{survey.title}</span>
                     <p>{survey.body}</p>
                     <p className='right'> Sent On {new Date(survey.dateSent).toLocaleDateString()}</p>
                     <div className='card-action'>
                     <a>Yes: {survey.yes}</a>
                     <a>No: {survey.no}</a>
                     </div>
                    </div>
                   </div>
        })
    }
    componentDidMount(){
        this.props.fetchSurveys()
    }
    render() {
        return <div>
            {this.renderSurveys()}
        </div>
    }
}
function mapStateToProps({surveys}){
    return {surveys}
}
export default connect(mapStateToProps, actions)(SurveyList)