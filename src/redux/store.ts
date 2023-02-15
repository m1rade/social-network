import thunkMiddleware from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import auth_reducer from "./auth_reducer";
import friends_reducer from "./friends_reducer";
import messages_reducer from "./messages_reducer";
import profile_reducer from "./profile_reducer";
import search_reducer from "./search_reducer";

const rootReducer = combineReducers({
    profile: profile_reducer,
    messages: messages_reducer,
    friends: friends_reducer,
    search: search_reducer,
    auth: auth_reducer,
});


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatchType = typeof store.dispatch;

// @ts-ignore
window.store = store;
