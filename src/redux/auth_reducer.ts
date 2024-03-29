import { authAPI, AuthUserDataType, FieldsErrorsType, LoginData, securityAPI } from "../api/social-networkAPI";
import { ServerResultCode } from "./../api/social-networkAPI";
import { toggleIsFetching, ToggleIsFetchingType } from "./app_reducer";
import { AppThunkType } from "./store";

const SET_USER_DATA = "AUTH/SET_USER_DATA";
const SET_CAPTCHA_URL = "AUTH/SET_CAPTCHA_URL";
const SET_ERRORS = "AUTH/SET_ERRORS";

const initialState = {
    data: {} as AuthUserDataType,
    isUserLoggedIn: false,
    captcha: null as null | string,
    errors: {
        fieldsErrors: [] as FieldsErrorsType[],
        message: null as null | string,
    },
};

const authReducer = (state: AuthDomainType = initialState, action: AuthActionType): AuthDomainType => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, data: { ...action.data }, isUserLoggedIn: action.isUserLoggedIn };
        case SET_CAPTCHA_URL:
            return { ...state, captcha: action.url };
        case SET_ERRORS:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    message: action.message,
                    fieldsErrors: action.fieldsErrors ? [...action.fieldsErrors] : [],
                },
            };
        default:
            return state;
    }
};

export default authReducer;

//actions
export const setUserData = (data: AuthUserDataType, isUserLoggedIn: boolean) =>
    ({
        type: SET_USER_DATA,
        data,
        isUserLoggedIn,
    } as const);
const setCaptchaURL = (url: string | null) =>
    ({
        type: SET_CAPTCHA_URL,
        url,
    } as const);
export const setErrors = (message: null | string, fieldsErrors?: FieldsErrorsType[]) =>
    ({
        type: SET_ERRORS,
        message,
        fieldsErrors,
    } as const);

// thunks
export const authorizeUser = (): AppThunkType => async dispatch => {
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
    async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));

        const captcha = getState().auth.captcha;
        if (captcha !== null) dispatch(setCaptchaURL(null));

        try {
            const resp = await authAPI.loginUser(formData);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(authorizeUser());
                    dispatch(setErrors(null));
                } else {
                    if (resp.data.resultCode === ServerResultCode.Captcha) {
                        dispatch(getCaptchaURL());
                    }
                    if (resp.data.messages.length > 0 && resp.data.fieldsErrors.length > 0) {
                        dispatch(setErrors(resp.data.messages[0], resp.data.fieldsErrors));
                    } else {
                        dispatch(setErrors(resp.data.messages.length !== 0 ? resp.data.messages[0] : "Some error"));
                    }
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

export const logoutUser = (): AppThunkType => async dispatch => {
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

export const getCaptchaURL = (): AppThunkType => async dispatch => {
    dispatch(toggleIsFetching(true));

    try {
        const resp = await securityAPI.getCaptchaURL();
        dispatch(setCaptchaURL(resp.data.url));
    } catch (err) {
        alert(err);
    } finally {
        dispatch(toggleIsFetching(false));
    }
};

//types
export type AuthDomainType = typeof initialState;

export type AuthActionType =
    | ReturnType<typeof setUserData>
    | ToggleIsFetchingType
    | ReturnType<typeof setCaptchaURL>
    | ReturnType<typeof setErrors>;
