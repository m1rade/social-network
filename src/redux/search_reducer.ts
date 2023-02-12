const SET_USERS = "SET_USERS"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const FOLLOW_UNFOLLOW_USER = "FOLLOW_UNFOLLOW_USER"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

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
        case SET_USERS:
            return { ...state, items: [...action.items] };
        case SET_TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount };
        case FOLLOW_UNFOLLOW_USER:
            return {
                ...state,
                items: state.items.map((i) => (i.id === action.id ? { ...i, followed: action.value } : i)),
            };
        case SET_CURRENT_PAGE:
            return { ...state, curPage: action.page };
        case SET_TOTAL_PAGES:
            return { ...state, itemsPerPage: action.totalPages };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.payload.value };
        default:
            return state;
    }
};

export default search_reducer;

//actions
export const follow_unfollowHandler = (id: number, value: boolean) =>
    ({
        type: FOLLOW_UNFOLLOW_USER,
        id,
        value,
    } as const);

export const setUsers = (items: UserType[]) =>
    ({
        type: SET_USERS,
        items,
    } as const);
export const setCurrentPage = (page: number) =>
    ({
        type: SET_CURRENT_PAGE,
        page,
    } as const);
export const setTotalPages = (totalPages: number) =>
    ({
        type: SET_TOTAL_PAGES,
        totalPages,
    } as const);

export const setTotalCount = (totalCount: number) =>
    ({
        type: SET_TOTAL_COUNT,
        totalCount,
    } as const);

export const toggleIsFetching = (value: boolean) =>
    ({
        type: TOGGLE_IS_FETCHING,
        payload: {
            value,
        }
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

export type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export type SearchActionType =
    | ReturnType<typeof follow_unfollowHandler>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalPages>
    | ReturnType<typeof setTotalCount>
    | ToggleIsFetchingType;
