const defaultState = {
    posts : [],
    comments : []
};

const ADD_POSTS_AT_FRONT = 'ADD_POSTS_AT_FRONT';
const REWRITE_POSTS = 'REWRITE_POSTS';
const ADD_POSTS = 'ADD_POSTS';
const DELETE_POST = 'DELETE_POST';
const ADD_COMMENTS = 'ADD_COMMENTS';
const REWRITE_COMMENTS = 'REWRITE_COMMENTS';
const DELETE_COMMENT = 'DELETE_COMMENT';
const CLEAR_POSTS = 'CLEAR_POSTS'

export const postReducer = (state = defaultState, action) => {
    switch(action.type){
        case ADD_COMMENTS : return {...state, 
            comments : [...state.comments, ...action.payload ],
        }
        case DELETE_COMMENT : return {...state, 
            comments : state.comments.filter(comment => comment.id !== action.payload)
        }
        case REWRITE_COMMENTS : return {...state, 
            comments : Array.isArray(action.payload) ? [...action.payload] : action.payload
        }

        case REWRITE_POSTS : return {...state, 
            posts : Array.isArray(action.payload) ? [...action.payload] : action.payload
        }
        case ADD_POSTS : return {...state, 
            posts : [...state.posts, ...action.payload ],
        }
        case DELETE_POST : return {...state, 
            posts : state.posts.filter(post => post.id !== action.payload)
        }
        case ADD_POSTS_AT_FRONT : return {...state,
            posts : action.payload.concat(state.posts)
        }

        case CLEAR_POSTS : return {...state,
            posts : [],
            comments : []
        }
        default : return {...state, state};
    }
}

export const addPostsAtFront_Action = (payload) => ({type: ADD_POSTS_AT_FRONT, payload})
export const rewritePosts_Action = (payload) => ({type: REWRITE_POSTS, payload})
export const addPosts_Action = (payload) => ({type: ADD_POSTS, payload})
export const deletePost_Action = (payload) => ({type: DELETE_POST, payload})
export const addComments_Action = (payload) => ({type: ADD_COMMENTS, payload})
export const rewriteComments_Action = (payload) => ({type: REWRITE_COMMENTS, payload})
export const deleteComment_Action = (payload) => ({type: DELETE_COMMENT, payload})
export const clearPosts_Action = () => ({type: CLEAR_POSTS})