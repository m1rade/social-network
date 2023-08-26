import { ServerResultCode, userAPI, UserType } from "../api/social-networkAPI";
import { toggleIsFetching, ToggleIsFetchingType } from "./app_reducer";
import { AppThunkType } from "./store";

const SET_USERS = "SEARCH/SET_USERS";
const SET_TOTAL_COUNT = "SEARCH/SET_TOTAL_COUNT";
const FOLLOW_UNFOLLOW_USER = "SEARCH/FOLLOW_UNFOLLOW_USER";
const SET_CURRENT_PAGE = "SEARCH/SET_CURRENT_PAGE";
const SET_TOTAL_PAGES = "SEARCH/SET_TOTAL_PAGES";
const TOGGLE_FOLLOWING_IN_PROGRESS = "SEARCH/TOGGLE_FOLLOWING_IN_PROGRESS";

const initialState = {
    items: [] as UserType[],
    totalCount: 0,
    error: "",
    curPage: 1,
    itemsPerPage: 20,
    followingInProgress: [] as number[],
};

const searchReducer = (
    state: SearchPageDomainType = initialState,
    action: SearchPageActionType
): SearchPageDomainType => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, items: [...action.items] };
        case SET_TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount };
        case FOLLOW_UNFOLLOW_USER:
            return {
                ...state,
                items: state.items.map(i => (i.id === action.id ? { ...i, followed: action.followed } : i)),
            };
        case SET_CURRENT_PAGE:
            return { ...state, curPage: action.page };
        case SET_TOTAL_PAGES:
            return { ...state, itemsPerPage: action.totalPages };
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.value
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID),
            };
        default:
            return state;
    }
};

export default searchReducer;

//actions
export const follow_unfollowUser = (id: number, followed: boolean) =>
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
const setCurrentPage = (page: number) =>
    ({
        type: SET_CURRENT_PAGE,
        page,
    } as const);
const setTotalPages = (totalPages: number) =>
    ({
        type: SET_TOTAL_PAGES,
        totalPages,
    } as const);

const setTotalCount = (totalCount: number) =>
    ({
        type: SET_TOTAL_COUNT,
        totalCount,
    } as const);

const toggleFollowingInProgress = (value: boolean, userID: number) =>
    ({
        type: TOGGLE_FOLLOWING_IN_PROGRESS,
        value,
        userID,
    } as const);

// thunks
export const getUsersThunk =
    (itemsPerPage: number, curPage: number): AppThunkType =>
    async dispatch => {
        dispatch(toggleIsFetching(true));

        try {
            const resp = await userAPI.getUsers(itemsPerPage, curPage);
            if (resp.data.error === null) {
                curPage !== 1 && dispatch(setCurrentPage(curPage));
                dispatch(setUsers(resp.data.items));
                dispatch(setTotalCount(resp.data.totalCount));
            } else {
                alert(resp.data.error);
            }
        } catch (err) {
            alert(err);
        } finally {
            dispatch(toggleIsFetching(false));
        }
    };

export const follow_UnfollowUserThunk =
    (userID: number, followed: boolean): AppThunkType =>
    async dispatch => {
        dispatch(toggleFollowingInProgress(true, userID));

        try {
            const isUserFollowed = await userAPI.isUserFollowed(userID);
            if (!isUserFollowed) {
                try {
                    const resp = await userAPI.followUser(userID);
                    if (resp.data.resultCode === ServerResultCode.OK) {
                        dispatch(follow_unfollowUser(userID, !followed));
                    } else {
                        alert(resp.data.messages);
                    }
                } catch (err) {
                    alert(err);
                }
            } else {
                try {
                    const resp = await userAPI.unfollowUser(userID);
                    if (resp.data.resultCode === ServerResultCode.OK) {
                        dispatch(follow_unfollowUser(userID, !followed));
                    } else {
                        alert(resp.data.messages);
                    }
                } catch (err) {
                    alert(err);
                }
            }
        } catch (err) {
            alert(err);
        } finally {
            dispatch(toggleFollowingInProgress(false, userID));
        }
    };

//types
export type SearchPageDomainType = typeof initialState;

export type SearchPageActionType =
    | ReturnType<typeof follow_unfollowUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalPages>
    | ReturnType<typeof setTotalCount>
    | ToggleIsFetchingType
    | ReturnType<typeof toggleFollowingInProgress>;
