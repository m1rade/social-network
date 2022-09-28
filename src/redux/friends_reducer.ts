export type FriendsType = { id: number; name: string };
export type ActionType = Friends_reducerACType;

const initState: FriendsType[] = [
    { id: 1, name: "Laura" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Alex" },
    { id: 4, name: "Lena" },
    { id: 5, name: "Max" },
];

const friends_reducer = (state = initState, { type, payload }: ActionType) => {
    switch (type) {
        case "":
            break;

        default:
            return state;
    }
};

export default friends_reducer;

export type Friends_reducerACType = ReturnType<typeof friends_reducerAC>;
export const friends_reducerAC = (payload: any) => ({
    type: "",
    payload,
});
