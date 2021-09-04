import { createStore, combineReducers } from "redux";
import { meReducer } from "./meReducer";
import { overlayReducer } from "./overlayReducer";
import { postReducer } from "./postReducer";

const rootReducer = combineReducers({
    me : meReducer,
    overlay : overlayReducer,
    posts : postReducer
})

export const store = createStore(rootReducer)