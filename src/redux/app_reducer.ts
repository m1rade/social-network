import { authorizeUser } from "./auth_reducer";
import { AppThunkType } from "./store";
const SET_INITIALIZATION = "SET_INITIALIZATION";

const initialState: InitialStateType = {
    isInitialized: false,
};

const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZATION:
            return { ...state, isInitialized: action.value };

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
type InitialStateType = {
    isInitialized: boolean;
};

export type AppActionType = ReturnType<typeof setInitialization>;
