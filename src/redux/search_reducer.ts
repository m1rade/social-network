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

const initialState: SearchPageDomainType = {
    items: [],
    totalCount: 0,
    error: null,
    curPage: 1,
    itemsPerPage: 20,
    isFetching: false,
};

const search_reducer = (
    state: SearchPageDomainType = initialState,
    action: SearchActionType
): SearchPageDomainType => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, items: [...action.items] };
        case "SET_TOTAL_COUNT":
            return { ...state, totalCount: action.totalCount };
        case "FOLLOW/UNFOLLOW_USER":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.id ? { ...i, followed: action.value } : i
                ),
            };
        case "SET_CURRENT_PAGE":
            return { ...state, curPage: action.page };
        case "SET_TOTAL_PAGES":
            return { ...state, itemsPerPage: action.totalPages };
        case "TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};

export default search_reducer;

//actions
export const follow_unfollowAC = (id: number, value: boolean) =>
    ({
        type: "FOLLOW/UNFOLLOW_USER",
        id,
        value,
    } as const);

export const setUsersAC = (items: UserType[]) =>
    ({
        type: "SET_USERS",
        items,
    } as const);
export const setCurrentPageAC = (page: number) =>
    ({
        type: "SET_CURRENT_PAGE",
        page,
    } as const);
export const setTotalPagesAC = (totalPages: number) =>
    ({
        type: "SET_TOTAL_PAGES",
        totalPages,
    } as const);

export const setTotalCountAC = (totalCount: number) =>
    ({
        type: "SET_TOTAL_COUNT",
        totalCount,
    } as const);

export const toggleIsFetchingAC = (value: boolean) =>
    ({
        type: "TOGGLE_IS_FETCHING",
        value,
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

type SearchPageDomainType = SearchResponseType & {
    curPage: number;
    itemsPerPage: number;
    isFetching: boolean;
};

export type SearchActionType =
    | ReturnType<typeof follow_unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalPagesAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof toggleIsFetchingAC>;
