export type ProfileType = {
    id: number;
    name: string;
    description: string;
    avatar: string;
    posts: PostType[];
    newPostMessage: string;
};

export type PostType = {
    id: number;
    message: string;
};

export type ActionType = updatePostMessageACType | addPostMessageACType;

const UPDATE_NEW_POST_MESSAGE = "UPDATE-NEW-POST-MESSAGE";
const ADD_POST = "ADD-POST";

const initState: ProfileType = {
    id: 1,
    name: "Cooool cat",
    description: "Cooool cat's description here",
    avatar: "https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png",
    posts: [
        { id: 1, message: "How are you today?" },
        { id: 2, message: "Hello world!" },
        { id: 3, message: "I ate" },
    ],
    newPostMessage: "",
};

const profile_reducer = (
    state: ProfileType = initState,
    action: ActionType
) => {
    switch (action.type) {
        case UPDATE_NEW_POST_MESSAGE:
            return { ...state, newPostMessage: action.newPostMessage };
        case ADD_POST:
            const newPostObj = {
                id: 4,
                message: state.newPostMessage,
            };
            return {
                ...state,
                posts: [newPostObj, ...state.posts],
                newPostMessage: "",
            };
        default:
            return state;
    }
};

type updatePostMessageACType = ReturnType<
    typeof updatePostMessageAC
>;
export const updatePostMessageAC = (newPostMessage: string) => ({
    type: UPDATE_NEW_POST_MESSAGE,
    newPostMessage,
} as const);

type addPostMessageACType = ReturnType<
    typeof addPostMessageAC
>;
export const addPostMessageAC = () => ({
    type: ADD_POST,
} as const);

export default profile_reducer;
