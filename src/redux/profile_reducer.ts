import { ToggleIsFetchingType, UserPhotoType } from "./search_reducer";

const UPDATE_NEW_POST_MESSAGE = "UPDATE-NEW-POST-MESSAGE";
const ADD_POST = "ADD-POST";
const SET_USER_INFO = "SET_USER_INFO";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const initState: ProfileDomainType = {
    userInfo: {
        aboutMe: "Cooool cat's description here",
        contacts: {
            facebook: "facebook.com",
            website: "",
            vk: "vk.com/cat",
            twitter: "https://twitter.com/",
            instagram: "instagra.com/",
            youtube: "",
            github: "github.com/",
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

const profile_reducer = (state: ProfileDomainType = initState, action: ProfileActionType): ProfileDomainType => {
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
export default profile_reducer;

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

export const setUserInfo = (userInfo: ProfileResponseType) =>
    ({
        type: SET_USER_INFO,
        userInfo,
    } as const);

//types
export type ProfileResponseType = {
    aboutMe: string;
    contacts: ContactsType;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: UserPhotoType;
};

type ContactsType = {
    facebook: string ;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
};

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
