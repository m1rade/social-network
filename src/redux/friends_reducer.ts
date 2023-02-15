export type FriendsType = { id: number; name: string };
export type FriendsActionType = FriendsReducerACType;

const initState: FriendsType[] = [
    { id: 1, name: "Laura" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Alex" },
    { id: 4, name: "Lena" },
    { id: 5, name: "Max" },
];

const friendsReducer = (state: FriendsType[] = initState, { type, payload }: FriendsActionType): FriendsType[] => {
    switch (type) {
        case "":
            return {...state};

        default:
            return state;
    }
};

export default friendsReducer;

export type FriendsReducerACType = ReturnType<typeof friendsReducerAC>;
export const friendsReducerAC = (payload: any) => ({
    type: "",
    payload,
});
