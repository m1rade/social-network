export type MessageType = {
    id: number,
    text: string
}

type MessagesType = {
    all_messages: MessageType[];
    newMessageText: string;
};

type ActionType = updateMessageACType | addMessageACType;

const UPDATE_MESSAGE = "UPDATE-MESSAGE";
const ADD_MESSAGE = "ADD-MESSAGE";

const initState: MessagesType = {
    all_messages: [
        { id: 1, text: "Hello" },
        {
            id: 2,
            text: "I think you should know you're his favourite worst nightmare",
        },
        {
            id: 3,
            text: "What do you mean you've never seen Blade Runner?",
        },
        {
            id: 4,
            text: "Sometimes it's easier to cry than try to figure out why",
        },
    ],
    newMessageText: "",
};

const messages_reducer = (state = initState, action: ActionType) => {
    switch (action.type) {
        case UPDATE_MESSAGE:
            return { ...state, newMessageText: action.newMessageValue };
        case ADD_MESSAGE:
            const newMessageObj = {
                id: 5,
                text: state.newMessageText,
            };
            return {
                all_messages: [...state.all_messages, newMessageObj],
                newMessageText: "",
            };
        default:
            return state;
    }
};

export default messages_reducer;

export type updateMessageACType = ReturnType<typeof updateMessageAC>;
export const updateMessageAC = (newMessageValue: string) => ({
    type: UPDATE_MESSAGE,
    newMessageValue,
} as const);

export type addMessageACType = ReturnType<typeof addMessageAC>;
export const addMessageAC = () => ({
    type: ADD_MESSAGE,
} as const);
