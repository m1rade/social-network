import { ProfileData, ProfileResponseType, ServerResultCode, UserPhotoType } from "../api/social-networkAPI";
import { profileAPI } from "./../api/social-networkAPI";
import { toggleIsFetching } from "./app_reducer";
import { AppThunkType } from "./store";

const ADD_POST = "PROFILE/ADD-POST";
const DELETE_POST = "PROFILE/DELETE_POST";
const SET_USER_INFO = "PROFILE/SET_USER_INFO";
const SET_PROFILE_STATUS = "PROFILE/SET_PROFILE_STATUS";
const SET_PROFILE_PHOTO = "PROFILE/SET_PROFILE_PHOTO";
const TOGGLE_UPDATE_IN_PROGRESS = "PROFILE/TOGGLE_UPDATE_IN_PROGRESS";
const UPDATE_FAILED = "PROFILE/UPDATE_FAILED";

const initState = {
    userInfo: {
        aboutMe: "",
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
        fullName: "",
        userId: null,
        photos: {
            small: "",
            large: "",
        },
    } as ProfileResponseType,
    status: "",
    posts: [] as PostType[],
    update: {
        updateInProgress: "Idle" as UpdateProfileType,
        errors: null as null | string[],
    },
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
        case TOGGLE_UPDATE_IN_PROGRESS:
            return { ...state, update: { ...state.update, updateInProgress: action.value } };
        case UPDATE_FAILED:
            return { ...state, update: { ...state.update, errors: action.messages } };
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

export const toggleUpdateInProgress = (value: UpdateProfileType) =>
    ({
        type: TOGGLE_UPDATE_IN_PROGRESS,
        value,
    } as const);
export const setErrorsOnFailedUpdate = (messages: string[] | null) =>
    ({
        type: UPDATE_FAILED,
        messages,
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
            console.log(err);
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
            console.log(err);
        }
    };

export const updateProfileStatus =
    (status: string): AppThunkType =>
    async dispatch => {
        dispatch(toggleUpdateInProgress("InProgress"));

        try {
            const resp = await profileAPI.updateProfileStatus(status);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(toggleUpdateInProgress("Successful"));
                    dispatch(setProfileStatus(status));
                }
            } else {
                dispatch(toggleUpdateInProgress("Failed"));
                dispatch(setErrorsOnFailedUpdate(resp.data.messages));
            }
        } catch (err) {
            dispatch(toggleUpdateInProgress("Failed"));
            alert(err);
        }
    };

export const changeProfilePhoto =
    (photo: File): AppThunkType =>
    async dispatch => {
        dispatch(toggleUpdateInProgress("InProgress"));
        try {
            const formData = new FormData();
            formData.append("image", photo);
            const resp = await profileAPI.changeProfilePhoto(formData);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(toggleUpdateInProgress("Successful"));
                    dispatch(setProfilePhoto(resp.data.data.photos));
                }
            } else {
                dispatch(toggleUpdateInProgress("Failed"));
                dispatch(setErrorsOnFailedUpdate(resp.data.messages));
            }
        } catch (error) {
            dispatch(toggleUpdateInProgress("Failed"));
            alert(error);
        }
    };

export const updateProfileData =
    (formData: ProfileData): AppThunkType =>
    async (dispatch, getState) => {
        dispatch(toggleUpdateInProgress("InProgress"));
        getState().profile.update.errors && dispatch(setErrorsOnFailedUpdate(null));

        try {
            const resp = await profileAPI.updateProfileData(formData);
            if (resp.status === 200) {
                if (resp.data.resultCode === ServerResultCode.OK) {
                    dispatch(toggleUpdateInProgress("Successful"));
                    formData.userId && dispatch(fetchProfile(formData.userId));
                } else {
                    dispatch(toggleUpdateInProgress("Failed"));
                    dispatch(setErrorsOnFailedUpdate(resp.data.messages));
                }
            }
        } catch (error) {
            dispatch(toggleUpdateInProgress("Failed"));
            alert(error);
        }
    };

//types
export type PostType = {
    id: number;
    message: string;
};

export type UpdateProfileType = "Successful" | "Failed" | "InProgress" | "Idle";

export type ProfileDomainType = typeof initState;

export type ProfileActionType =
    | ReturnType<typeof addPostMessage>
    | ReturnType<typeof setUserInfo>
    | ReturnType<typeof setProfileStatus>
    | ReturnType<typeof deletePostMessage>
    | ReturnType<typeof setProfilePhoto>
    | ReturnType<typeof toggleUpdateInProgress>
    | ReturnType<typeof setErrorsOnFailedUpdate>;
