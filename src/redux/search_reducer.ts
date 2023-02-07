// [
//         {
//             name: "Puss in boots",
//             id: 27770,
//             uniqueUrlName: null,
//             photos: {
//                 small: "https://www.looper.com/img/gallery/the-ending-of-puss-in-boots-the-last-wish-explained/intro-1671811424.webp",
//                 large: "",
//             },
//             status: "Busy",
//             followed: false,
//         },
//         {
//             name: "Puss in boots",
//             id: 27771,
//             uniqueUrlName: null,
//             photos: {
//                 small: "https://www.looper.com/img/gallery/the-ending-of-puss-in-boots-the-last-wish-explained/intro-1671811424.webp",
//                 large: "",
//             },
//             status: "Busy",
//             followed: false,
//         },
//         {
//             name: "Puss in boots",
//             id: 27772,
//             uniqueUrlName: null,
//             photos: {
//                 small: "https://www.looper.com/img/gallery/the-ending-of-puss-in-boots-the-last-wish-explained/intro-1671811424.webp",
//                 large: "",
//             },
//             status: "Busy",
//             followed: false,
//         },
//     ],

const initialState: SearchResponseType = {
    items: [],
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
