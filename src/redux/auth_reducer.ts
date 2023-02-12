import { ToggleIsFetchingType } from './search_reducer';

const SET_USER_DATA = "SET_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"


const initialState: AuthStateType = {
    data: {
        id: null,
        login: null,
        email: null,
    },
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    isFetching: false,
};

const auth_reducer = (state: AuthStateType = initialState, { type, payload }: ActionType): AuthStateType => {
    switch (type) {
        case SET_USER_DATA:
            return { ...state, ...payload.data };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: payload.value }
        default:
            return state;
    }
};

export default auth_reducer;

//actions
export const setUserData = (data: AuthDataResponseType) => ({
    type: SET_USER_DATA,
    payload: {
        data,
    }
} as const);


//types
type AuthResponseType = {
    data: AuthDataResponseType
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

type AuthDataResponseType = {
    id: number | null
    email: string | null
    login: string | null
}

type AuthStateType = AuthResponseType & {
    isFetching: boolean
}

type ActionType = ReturnType<typeof setUserData> | ToggleIsFetchingType