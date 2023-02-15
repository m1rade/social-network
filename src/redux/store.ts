import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth_reducer";
import friends_reducer from "./friends_reducer";
import messagesReducer from "./messages_reducer";
import profileReducer from "./profile_reducer";
import searchReducer from "./search_reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    friends: friends_reducer,
    search: searchReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatchType = typeof store.dispatch;

// @ts-ignore
window.store = store;
