import { ProfileResponseType } from "../api/social-networkAPI";
import { profileAPI } from "./../api/social-networkAPI";
import { toggleIsFetching, ToggleIsFetchingType } from "./search_reducer";
import { AppDispatchType } from "./store";

const UPDATE_NEW_POST_MESSAGE = "UPDATE-NEW-POST-MESSAGE";
const ADD_POST = "ADD-POST";
const SET_USER_INFO = "SET_USER_INFO";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

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
        userId: 1,
        photos: {
            small: "https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png",
            large: "",
        },
    },
    posts: [
        { id: 1, message: "How are you today?" },
        { id: 2, message: "Hello world!" },
        { id: 3, message: "I ate" },
    ],
    newPostMessage: "",
    isFetching: false,
};

const profileReducer = (state: ProfileDomainType = initState, action: ProfileActionType): ProfileDomainType => {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, userInfo: action.userInfo };
        case UPDATE_NEW_POST_MESSAGE:
            return { ...state, newPostMessage: action.newPostMessage };
        case ADD_POST:
            const newPostObj = {
                id: new Date().getTime(),
                message: state.newPostMessage,
            };
            return {
                ...state,
                posts: [newPostObj, ...state.posts],
                newPostMessage: "",
            };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};
export default profileReducer;

//actions
export const updatePostMessage = (newPostMessage: string) =>
    ({
        type: UPDATE_NEW_POST_MESSAGE,
        newPostMessage,
    } as const);

export const addPostMessage = () =>
    ({
        type: ADD_POST,
    } as const);

const setUserInfo = (userInfo: ProfileResponseType) =>
    ({
        type: SET_USER_INFO,
        userInfo,
    } as const);

//thunks
export const fetchProfile = (userID: string) => async (dispatch: AppDispatchType) => {
    dispatch(toggleIsFetching(true));

    if (!userID) {
        userID = "2";
    }

    try {
        const resp = await profileAPI.fetchProfile(userID);
        dispatch(setUserInfo(resp.data));
    } catch (err) {
        alert(err);
    } finally {
        dispatch(toggleIsFetching(false));
    }
};

//types
export type PostType = {
    id: number;
    message: string;
};

export type ProfileDomainType = {
    userInfo: ProfileResponseType;
    posts: PostType[];
    newPostMessage: string;
    isFetching: boolean;
};

export type ProfileActionType =
    | ReturnType<typeof updatePostMessage>
    | ReturnType<typeof addPostMessage>
    | ReturnType<typeof setUserInfo>
    | ToggleIsFetchingType;
