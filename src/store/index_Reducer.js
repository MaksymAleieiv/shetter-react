import { createStore, combineReducers, applyMiddleware } from 'redux';
import { meReducer } from './meReducer';
import { overlayReducer } from './overlayReducer';
import { postReducer } from './postReducer';
import { selectedPostReducer } from './selectedPostsReducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    me : meReducer,
    overlay : overlayReducer,
    posts : postReducer,
    selected: selectedPostReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))