import { authAPI } from "../api/social-networkAPI";
import { ServerResultCode } from "./../api/social-networkAPI";
import { toggleIsFetching, ToggleIsFetchingType } from "./search_reducer";
import { AppDispatchType } from "./store";

const SET_USER_LOGIN = "SET_USER_LOGIN";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_IS_USER_LOGGED_IN = "SET_IS_USER_LOGGED_IN";

const initialState: AuthDomainType = {
    login: "",
    isFetching: false,
    isUserLoggedIn: false,
};

const authReducer = (state: AuthDomainType = initialState, action: ActionType): AuthDomainType => {
    switch (action.type) {
        case SET_IS_USER_LOGGED_IN:
            return { ...state, isUserLoggedIn: action.value };
        case SET_USER_LOGIN:
            return { ...state, login: action.login };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};

export default authReducer;

//actions
export const setUserLogin = (login: string) =>
    ({
        type: SET_USER_LOGIN,
        login,
    } as const);

export const setIsUserLoggedIn = (value: boolean) =>
    ({
        type: SET_IS_USER_LOGGED_IN,
        value,
    } as const);

// thunks
export const checkUserAuthentication = () => async (dispatch: AppDispatchType) => {
    dispatch(toggleIsFetching(true));

    try {
        const data = await authAPI.authorizeUser();
        if (data.resultCode === ServerResultCode.OK) {
            dispatch(setIsUserLoggedIn(true));
            dispatch(setUserLogin(data.data.login));
        } else {
            alert(data.messages);
        }
    } catch (err) {
        alert(err);
    } finally {
        dispatch(toggleIsFetching(false));
    }
};

//types
export type AuthDomainType = {
    login: string;
    isFetching: boolean;
    isUserLoggedIn: boolean;
};

type ActionType = ReturnType<typeof setUserLogin> | ToggleIsFetchingType | ReturnType<typeof setIsUserLoggedIn>;
