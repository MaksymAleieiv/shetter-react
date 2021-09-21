const defaultState = {
    posts : [],
    comments : []
};

const CLEAR_SELECTED = 'CLEAR_SELECTED'
const TOGGLE_SELECTED_COMMENTS = 'ADD_SELECTED_COMMENTS'
const TOGGLE_SELECTED_POSTS = 'ADD_SELECTED_POSTS'
const TOOGLE_SELECTION_MODE = 'TOOGLE_SELECTION_MODE'

export const selectedPostReducer = (state = defaultState, action) => {
    console.log(state)
    console.log(action)
    switch(action.type){
        case TOGGLE_SELECTED_COMMENTS : 
            let newCom = state.comments.indexOf(action.payload) === -1 ? 
            [...state.comments, action.payload] 
            :
            [...state.comments].filter(id => id !== action.payload)

            return {...state, 
            comments : newCom
        }
        case TOGGLE_SELECTED_POSTS :
            let newPos = state.posts.indexOf(action.payload) === -1 ? 
            [...state.posts, action.payload] 
            :
            [...state.posts].filter(id => id !== action.payload)
            
            return {...state, 
            posts : newPos
        }
        case CLEAR_SELECTED : return {...state,
            posts : [],
            comments : []
        }
        default : return {...state, state};
    }
}

export const toggleSelectionMode_Action = (payload = null) => ({type: TOOGLE_SELECTION_MODE, payload})
export const clearSelected_Action = () => ({type: CLEAR_SELECTED})
export const toggleSelectedComments_Action = (payload) => ({type: TOGGLE_SELECTED_COMMENTS, payload})
export const toggleSelectedPosts_Action = (payload) => ({type: TOGGLE_SELECTED_POSTS, payload})