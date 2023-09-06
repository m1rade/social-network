import { ProfileResponseType, ServerResultCode, UserPhotoType } from "../api/social-networkAPI";
import { profileAPI } from "./../api/social-networkAPI";
import { toggleIsFetching } from "./app_reducer";
import { AppThunkType } from "./store";

const ADD_POST = "PROFILE/ADD-POST";
const DELETE_POST = "PROFILE/DELETE_POST";
const SET_USER_INFO = "PROFILE/SET_USER_INFO";
const SET_PROFILE_STATUS = "PROFILE/SET_PROFILE_STATUS";
const SET_PROFILE_PHOTO = "PROFILE/SET_PROFILE_PHOTO";

const initState = {
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
        lookingForAJobDescription: "",
        fullName: "Cooool cat",
        userId: null,
        photos: {
            small: "",
            large: "",
        },
    } as ProfileResponseType,
    status: "",
    posts: [] as PostType[],
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
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id !== action.id) };
        case SET_PROFILE_STATUS:
            return { ...state, status: action.status };
        case SET_PROFILE_PHOTO:
            return { ...state, userInfo: { ...state.userInfo, photos: action.photos } };
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

export const deletePostMessage = (id: number) =>
    ({
        type: DELETE_POST,
        id,
    } as const);

const setUserInfo = (userInfo: ProfileResponseType) =>
    ({
        type: SET_USER_INFO,
        userInfo,
    } as const);

export const setProfileStatus = (status: string) =>
    ({
        type: SET_PROFILE_STATUS,
        status,
    } as const);

export const setProfilePhoto = (photos: UserPhotoType) =>
    ({
        type: SET_PROFILE_PHOTO,
        photos,
    } as const);

//thunks
export const fetchProfile =
    (userID: string | number): AppThunkType =>
    async dispatch => {
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
    async dispatch => {
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
    async dispatch => {
        dispatch(toggleIsFetching(true));

        try {
            const resp = await profileAPI.updateProfileStatus(status);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(setProfileStatus(status));
                }
            }
        } catch (err) {
            alert(err);
        } finally {
            dispatch(toggleIsFetching(false));
        }
    };

export const changeProfilePhoto =
    (photo: File): AppThunkType =>
    async dispatch => {
        dispatch(toggleIsFetching(true));

        try {
            const formData = new FormData();
            formData.append("image", photo);
            const resp = await profileAPI.changeProfilePhoto(formData);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(setProfilePhoto(resp.data.data.photos));
                }
            }
        } catch (error) {
            alert(error);
        } finally {
            dispatch(toggleIsFetching(false));
        }
    };

//types
export type PostType = {
    id: number;
    message: string;
};

export type ProfileDomainType = typeof initState;

export type ProfileActionType =
    | ReturnType<typeof addPostMessage>
    | ReturnType<typeof setUserInfo>
    | ReturnType<typeof setProfileStatus>
    | ReturnType<typeof deletePostMessage>
    | ReturnType<typeof setProfilePhoto>;
