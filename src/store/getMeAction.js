import { changeMe_Action } from './meReducer';
import axios from 'axios';

export const getMe = () => {
    return dispatch => {
        const access = window.localStorage.getItem('access');
        if(access) {
            const instance = axios.create({
                headers : {
                    'Authorization' : 'Bearer ' + access
                }
            })
            instance.get('/auth/users/me')
            .then(res => {
                dispatch(changeMe_Action(res.data))
            })
            .catch(err => {});
        }
    }
}