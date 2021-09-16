const defaultState = {
    me : {
        bio: '',
        first_name: '',
        id: -1,
        last_name: '',
        profile_photo: '',
        username: ''  
    }
};

const CHANGE_ME = 'CHANGE_DATA';
const CLEAR_ME = 'CLEAR_ME';
const GET_ME = 'GET_ME';

export const meReducer = (state = defaultState, action) => {
    switch(action.type){
        case GET_ME : return {...state, me : action.payload}
        case CHANGE_ME : return {...state, me : action.payload}
        case CLEAR_ME : return {...state, me : defaultState.me}
        default : return {...state, state};
    }
}

export const changeMe_Action = (payload) => ({type: CHANGE_ME, payload})
export const clearMe_Action = () => ({type: CLEAR_ME})
export const getMe_Action = (payload) => ({type: GET_ME, payload})