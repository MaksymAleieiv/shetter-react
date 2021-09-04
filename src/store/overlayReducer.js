const defaultState = {
    overlayVisibility : false,
    overlayImage : 0,
    overlayImages : []
};

export const overlayReducer = (state = defaultState, action) => {
    switch(action.type){
        case "CHANGE_DATA__OVERLAY" : return {...state, 
            overlayVisibility : action.payload.overlayVisibility,
            overlayImage : action.payload.overlayImage,
            overlayImages : action.payload.overlayImages
        }
        case "PREV_IMAGE" : return {...state, overlayImage : state.overlayImage - 1}
        case "NEXT_IMAGE" : return {...state, overlayImage : state.overlayImage + 1}
        case "CLEAR_OVERLAY" : return {...state, 
            overlayVisibility : defaultState.overlayVisibility,
            overlayImage : defaultState.overlayImage,
            overlayImages : defaultState.overlayImages
        }
        default : return state;
    }
}