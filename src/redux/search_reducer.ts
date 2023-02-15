import { ResultCode, userAPI, UserType } from "../api/social-networkAPI";
import { AppDispatchType } from "./store";

const SET_USERS = "SET_USERS";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const FOLLOW_UNFOLLOW_USER = "FOLLOW_UNFOLLOW_USER";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const initialState: SearchPageDomainType = {
    items: [],
    totalCount: 0,
    error: null,
    curPage: 1,
    itemsPerPage: 20,
    isFetching: false,
};

const search_reducer = (state: SearchPageDomainType = initialState, action: SearchActionType): SearchPageDomainType => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, items: [...action.items] };
        case SET_TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount };
        case FOLLOW_UNFOLLOW_USER:
            return {
                ...state,
                items: state.items.map((i) => (i.id === action.id ? { ...i, followed: action.followed } : i)),
            };
        case SET_CURRENT_PAGE:
            return { ...state, curPage: action.page };
        case SET_TOTAL_PAGES:
            return { ...state, itemsPerPage: action.totalPages };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.value };
        default:
            return state;
    }
};

export default search_reducer;

//actions
export const follow_unfollowHandler = (id: number, followed: boolean) =>
    ({
        type: FOLLOW_UNFOLLOW_USER,
        id,
        followed,
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
        value,
    } as const);

// thunks
export const getUsersThunk = (itemsPerPage: number, curPage: number) => async (dispatch: AppDispatchType) => {
    dispatch(toggleIsFetching(true));

    try {
        const data = await userAPI.getUsers(itemsPerPage, curPage);
        if (data.error === null) {
            curPage !== 1 && dispatch(setCurrentPage(curPage));
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
        } else {
            alert(data.error);
        }
    } catch (err) {
        alert(err);
    } finally {
        dispatch(toggleIsFetching(false));
    }
};

export const follow_UnfollowUserThunk = (userID: number, followed: boolean) => async (dispatch: AppDispatchType) => {
    dispatch(toggleIsFetching(true));

    try {
        const isUserFollowed = await userAPI.isUserFollowed(userID);
        if (!isUserFollowed) {
            try {
                const resp = await userAPI.followUser(userID);
                if (resp.data.resultCode === ResultCode.OK) {
                    dispatch(follow_unfollowHandler(userID, !followed));
                    dispatch(toggleIsFetching(false));
                } else {
                    alert(resp.data.messages);
                }
            } catch (err) {
                alert(err);
            }
        } else {
            const resp = await userAPI.unfollowUser(userID);
            if (resp.data.resultCode === ResultCode.OK) {
                dispatch(follow_unfollowHandler(userID, !followed));
                dispatch(toggleIsFetching(false));
            } else {
                alert(resp.data.messages);
            }
        }
    } catch (err) {
        alert(err);
    } finally {
        dispatch(toggleIsFetching(false));
    }
};

//types
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

export type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>;
export type SearchActionType =
    | ReturnType<typeof follow_unfollowHandler>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalPages>
    | ReturnType<typeof setTotalCount>
    | ToggleIsFetchingType;
