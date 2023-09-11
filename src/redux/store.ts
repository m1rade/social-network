import { applyMiddleware, combineReducers, createStore } from "redux";
import { FormAction, reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import appReducer, { AppActionType } from "./app_reducer";
import authReducer, { AuthActionType } from "./auth_reducer";
import friendsReducer from "./friends_reducer";
import messagesReducer from "./messages_reducer";
import profileReducer, { ProfileActionType } from "./profile_reducer";
import searchReducer, { SearchPageActionType } from "./search_reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    search: searchReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

export type AppStateType = ReturnType<typeof rootReducer>;
type rootActionsType = SearchPageActionType | ProfileActionType | AuthActionType | FormAction | AppActionType;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, rootActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, rootActionsType>;

// @ts-ignore
window.store = store;
