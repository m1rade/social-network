import { ToggleIsFetchingType } from "./search_reducer";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const initialState: AuthStateType = {
    data: {
        id: 0,
        login: "",
        email: "",
    },
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    isFetching: false,
    isAuth: false,
};

const auth_reducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return { ...state, data: { ...action.data.data }, isAuth: true };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};

export default auth_reducer;

//actions
export const setAuthUserData = (data: AuthStateType) =>
    ({
        type: SET_AUTH_USER_DATA,
        data,
    } as const);

//types
type AuthResponseType = {
    data: AuthDataResponseType;
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
};

type AuthDataResponseType = {
    id: number;
    email: string;
    login: string;
};

export type AuthStateType = AuthResponseType & {
    isFetching: boolean;
    isAuth: boolean;
};

type ActionType = ReturnType<typeof setAuthUserData> | ToggleIsFetchingType;
