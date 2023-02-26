import { stopSubmit } from "redux-form";
import { authAPI, AuthUserDataType, LoginData } from "../api/social-networkAPI";
import { ServerResultCode } from "./../api/social-networkAPI";
import { toggleIsFetching, ToggleIsFetchingType } from "./search_reducer";
import { AppThunkType } from "./store";

const SET_USER_DATA = "SET_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const initialState: AuthDomainType = {
    data: {
        id: null,
        email: null,
        login: null,
    },
    isFetching: false,
    isUserLoggedIn: false,
};

const authReducer = (state: AuthDomainType = initialState, action: AuthActionType): AuthDomainType => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, data: { ...action.data }, isUserLoggedIn: action.isUserLoggedIn };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};

export default authReducer;

//actions
const setUserData = (data: AuthUserDataType, isUserLoggedIn: boolean) =>
    ({
        type: SET_USER_DATA,
        data,
        isUserLoggedIn,
    } as const);

// thunks
export const authorizeUser = (): AppThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let resp;

    try {
        resp = await authAPI.authorizeUser();
        if (resp.status === 200) {
            if (resp.data.resultCode === ServerResultCode.OK) {
                dispatch(setUserData(resp.data.data, true));
            }
        }
    } catch (err) {
        alert(err);
    } finally {
        dispatch(toggleIsFetching(false));
    }

    return resp;
};

export const loginUser =
    (formData: LoginData): AppThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true));
        try {
            const resp = await authAPI.loginUser(formData);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(authorizeUser());
                } else {
                    dispatch(
                        stopSubmit("login", {
                            _error: resp.data.messages.length > 0 ? resp.data.messages[0] : "Some error",
                        })
                    );
                }
            } else {
                alert(resp.statusText);
            }
        } catch (err) {
            alert(err);
        } finally {
            dispatch(toggleIsFetching(false));
        }
    };

export const logoutUser = (): AppThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
        const resp = await authAPI.logoutUser();
        if (resp.status === 200) {
            if (resp.data.resultCode === ServerResultCode.OK) {
                dispatch(setUserData({ id: null, email: null, login: null }, false));
            } else {
                alert(resp.data.messages);
            }
        } else {
            alert(resp.statusText);
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

export type AuthActionType = ReturnType<typeof setUserData> | ToggleIsFetchingType;
