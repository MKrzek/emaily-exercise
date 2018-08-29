import { FETCH_USER } from '../actions/types.js'
export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            console.log('auth payload', action.payload)
            return action.payload || false
        default:
            return state
    }
}