import { combineReducers, createStore } from "redux";
import friends_reducer from "./friends_reducer";
import messages_reducer from "./messages_reducer";
import profile_reducer from "./profile_reducer";

const reducers = combineReducers({
    profile: profile_reducer,
    messages: messages_reducer,
    friends: friends_reducer
});

const store = createStore(reducers);

export default store;