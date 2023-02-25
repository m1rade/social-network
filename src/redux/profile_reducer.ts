import { ProfileResponseType, ServerResultCode } from "../api/social-networkAPI";
import { profileAPI } from "./../api/social-networkAPI";
import { toggleIsFetching, ToggleIsFetchingType } from "./search_reducer";
import { AppThunkType } from "./store";

const ADD_POST = "ADD-POST";
const SET_USER_INFO = "SET_USER_INFO";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";

const initState: ProfileDomainType = {
    userInfo: {
        aboutMe: "Cooool cat's description here",
        contacts: {
            facebook: "",
            website: "",
            vk: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            mainLink: "",
        },
        lookingForAJob: false,
        lookingForAJobDescription: "gfgf",
        fullName: "Cooool cat",
        userId: null,
        photos: {
            small: "https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png",
            large: "",
        },
    },
    status: "",
    posts: [
        { id: 1, message: "How are you today?" },
        { id: 2, message: "Hello world!" },
        { id: 3, message: "I ate" },
    ],
    isFetching: false,
};

const profileReducer = (state: ProfileDomainType = initState, action: ProfileActionType): ProfileDomainType => {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, userInfo: action.userInfo };
        case ADD_POST:
            const newPostObj = {
                id: new Date().getTime(),
                message: action.newPostMessage,
            };
            return {
                ...state,
                posts: [newPostObj, ...state.posts],
            };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        case SET_PROFILE_STATUS:
            return { ...state, status: action.status };
        default:
            return state;
    }
};
export default profileReducer;

//actions
export const addPostMessage = (newPostMessage: string) =>
    ({
        type: ADD_POST,
        newPostMessage,
    } as const);

const setUserInfo = (userInfo: ProfileResponseType) =>
    ({
        type: SET_USER_INFO,
        userInfo,
    } as const);

const setProfileStatus = (status: string) =>
    ({
        type: SET_PROFILE_STATUS,
        status,
    } as const);

//thunks
export const fetchProfile =
    (userID: string | number): AppThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true));

        try {
            const resp = await profileAPI.fetchProfile(userID);
            dispatch(setUserInfo(resp.data));
        } catch (err) {
            alert(err);
        } finally {
            dispatch(toggleIsFetching(false));
        }
    };

export const getProfileStatus =
    (userID: string | number): AppThunkType =>
    async (dispatch) => {

        try {
            const resp = await profileAPI.getProfileStatus(userID);
            if (resp.status === 200) {
                dispatch(setProfileStatus(resp.data));
            }
        } catch (err) {
            alert(err);
        }
    };

export const updateProfileStatus =
    (status: string): AppThunkType =>
    async (dispatch) => {
        try {
            const resp = await profileAPI.updateProfileStatus(status);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(setProfileStatus(status));
                }
            }
        } catch (err) {
            alert(err);
        }
    };

//types
export type PostType = {
    id: number;
    message: string;
};

export type ProfileDomainType = {
    userInfo: ProfileResponseType;
    status: string;
    posts: PostType[];
    isFetching: boolean;
};

export type ProfileActionType =
    | ReturnType<typeof addPostMessage>
    | ReturnType<typeof setUserInfo>
    | ReturnType<typeof setProfileStatus>
    | ToggleIsFetchingType;
