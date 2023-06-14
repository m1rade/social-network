import messagesReducer, { MessagesType, addMessage } from "../messages_reducer";

let startState: MessagesType;

beforeEach(() => {
    startState = {
        all_messages: [
            { id: 1, text: "Hello" },
            {
                id: 2,
                text: "I think you should know you're his favourite worst nightmare",
            },
        ],
    };
});

describe("message reducer", () => {
    it("should add new message", () => {
        const action = addMessage("New message");

        const endState = messagesReducer(startState, action);

        expect(endState.all_messages.length).toBe(3);
        expect(endState.all_messages[2].text).toBe("New message");
        expect(endState.all_messages[2].id).toBeDefined();
    });
});
