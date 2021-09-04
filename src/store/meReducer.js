const defaultState = {
    me : {
        bio: "",
        first_name: "",
        id: -1,
        last_name: "",
        profile_photo: "",
        username: ""  
    }
};

export const meReducer = (state = defaultState, action) => {
    switch(action.type){
        case "CHANGE_DATA" : return {...state, me : action.payload}
        case "CLEAR_ME" : return {...state, me : defaultState.me}
        default : return {...state, state};
    }
}