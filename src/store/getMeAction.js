import { changeMe_Action, clearMe_Action } from './meReducer';
import axios from 'axios';

export const getMe = () => {
    return dispatch => {
        axios.get('/auth/users/me')
        .then(res => {
            if(res.data.id === null) dispatch( clearMe_Action() )
            else dispatch(changeMe_Action(res.data))
        })
        .catch(err => {});
    }
}