import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import authReducer, { AuthActionType } from "./auth_reducer";
import friendsReducer from "./friends_reducer";
import messagesReducer from "./messages_reducer";
import profileReducer, { ProfileActionType } from "./profile_reducer";
import searchReducer, { SearchPageActionType } from "./search_reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    search: searchReducer,
    auth: authReducer,
    form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

export type AppStateType = ReturnType<typeof rootReducer>;
type AppActionsType = SearchPageActionType | ProfileActionType | AuthActionType;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>;

// @ts-ignore
window.store = store;
