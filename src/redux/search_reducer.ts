
const initialState: SearchResponseType = {
    items: [
        {
            name: "Puss in boots",
            id: 27770,
            uniqueUrlName: null,
            photos: {
                small: "https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png",
                large: "",
            },
            status: "Busy",
            followed: false,
        },
    ],
    totalCount: 22837,
    error: null,
};

const search_reducer = (
    state: SearchResponseType = initialState,
    action: SearchActionType
): SearchResponseType => {
    switch (action.type) {
        case "SET-USERS":
            return { ...state, items: [...state.items, ...action.items] };
        case "FOLLOW/UNFOLLOW_USER":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.id ? { ...i, followed: !i.followed } : i
                ),
            };

        default:
            return state;
    }
};

export default search_reducer;

//actions
export const follow_unfollowAC = (id: number) =>
    ({
        type: "FOLLOW/UNFOLLOW_USER",
        id,
    } as const);

export const setUsersAC = (items: UserType[]) =>
    ({
        type: "SET-USERS",
        items,
    } as const);

//types
export type UserType = {
    name: string;
    id: number;
    uniqueUrlName: string | null;
    photos: UserPhotoType;
    status?: string | null;
    followed: boolean;
};

export type UserPhotoType = {
    small: string;
    large: string;
};

type SearchResponseType = {
    items: UserType[];
    totalCount: number;
    error: string | null;
};

export type SearchActionType =
    | ReturnType<typeof follow_unfollowAC>
    | ReturnType<typeof setUsersAC>;
