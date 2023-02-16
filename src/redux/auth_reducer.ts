import { authAPI, AuthUserDataType } from "../api/social-networkAPI";
import { ServerResultCode } from "./../api/social-networkAPI";
import { toggleIsFetching, ToggleIsFetchingType } from "./search_reducer";
import { AppThunkType } from "./store";

const SET_USER_LOGIN = "SET_USER_LOGIN";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_IS_USER_LOGGED_IN = "SET_IS_USER_LOGGED_IN";

const initialState: AuthDomainType = {
    data: {
        id: 2,
        email: "",
        login: "",
    },
    isFetching: false,
    isUserLoggedIn: false,
};

const authReducer = (state: AuthDomainType = initialState, action: AuthActionType): AuthDomainType => {
    switch (action.type) {
        case SET_IS_USER_LOGGED_IN:
            return { ...state, isUserLoggedIn: action.value };
        case SET_USER_LOGIN:
            return { ...state, data: { ...action.data } };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};

export default authReducer;

//actions
const setUserData = (data: AuthUserDataType) =>
    ({
        type: SET_USER_LOGIN,
        data,
    } as const);

const setIsUserLoggedIn = (value: boolean) =>
    ({
        type: SET_IS_USER_LOGGED_IN,
        value,
    } as const);

// thunks
export const checkUserAuthentication = (): AppThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    try {
        const resp = await authAPI.authorizeUser();
        if (resp.data.resultCode === ServerResultCode.OK) {
            dispatch(setIsUserLoggedIn(true));
            dispatch(setUserData(resp.data.data));
        } else {
            alert(resp.data.messages);
        }
    } catch (err) {
        alert(err);
    } finally {
        dispatch(toggleIsFetching(false));
    }
};

//types
export type AuthDomainType = {
    data: AuthUserDataType;
    isFetching: boolean;
    isUserLoggedIn: boolean;
};

export type AuthActionType =
    | ReturnType<typeof setUserData>
    | ToggleIsFetchingType
    | ReturnType<typeof setIsUserLoggedIn>;
