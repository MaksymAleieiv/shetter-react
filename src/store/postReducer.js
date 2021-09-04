const defaultState = {
    posts : [],
    comments : []
};

export const postReducer = (state = defaultState, action) => {
    switch(action.type){
        case "ADD_COMMENTS" : return {...state, 
            comments : [...state.comments, ...action.payload],
        }
        case "DELETE_COMMENT" : return {...state, 
            comments : state.comments.filter(comment => comment.id !== action.payload)
        }
        case "REWRITE_COMMENTS" : return {...state, 
            comments : action.payload.id !== undefined ? action.payload : [...action.payload]
        }

        case "REWRITE_POSTS" : return {...state, 
            posts : action.payload.id !== undefined ? action.payload : [...action.payload]
        }
        case "ADD_POSTS" : return {...state, 
            posts : [...state.posts, ...action.payload],
        }
        case "DELETE_POST" : return {...state, 
            posts : state.posts.filter(post => post.id !== action.payload)
        }
        case "ADD_POSTS_AT_FRONT" : return {
            ...state, posts : action.payload.concat(state.posts)
        }

        case "CLEAR_POSTS" : return {...state, 
            posts : [],
            comments : []
        }
        default : return {...state, state};
    }
}