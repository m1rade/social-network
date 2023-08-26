import { authorizeUser } from "./auth_reducer";
import { AppThunkType } from "./store";

const SET_INITIALIZATION = "APP/SET_INITIALIZATION";
const TOGGLE_IS_FETCHING = "APP/TOGGLE_IS_FETCHING";

const initialState = {
    isInitialized: false,
    isFetching: false
};

const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZATION:
            return { ...state, isInitialized: action.value };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};

export default appReducer;

//actions
const setInitialization = (value: boolean) =>
    ({
        type: SET_INITIALIZATION,
        value,
    } as const);

export const toggleIsFetching = (value: boolean) =>
    ({
        type: TOGGLE_IS_FETCHING,
        value,
    } as const);

//thunks
export const initializeApp = (): AppThunkType => (dispatch) => {
    const authPromise = dispatch(authorizeUser());

    Promise.all([authPromise])
        .then((resp) => {
            dispatch(setInitialization(true));
        }).catch((error) => {
            alert(error)
        })
};

//types
type InitialStateType = typeof initialState;

export type AppActionType = ReturnType<typeof setInitialization> | ToggleIsFetchingType;
export type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>;
