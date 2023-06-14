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
};

const messagesReducer = (state: MessagesType = initState, action: MessagesActionType): MessagesType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessageObj = {
                id: new Date().getTime(),
                text: action.newMessage,
            };
            return {
                all_messages: [...state.all_messages, newMessageObj],
            };
        default:
            return state;
    }
};

export default messagesReducer;

// actions
export type addMessageACType = ReturnType<typeof addMessage>;
export const addMessage = (newMessage: string) =>
    ({
        type: ADD_MESSAGE,
        newMessage
    } as const);

//types
export type MessageType = {
    id: number;
    text: string;
};

export type MessagesType = {
    all_messages: MessageType[];
};

export type MessagesActionType = addMessageACType;
