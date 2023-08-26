import { createSelector } from "reselect";
import { ProfileResponseType, UserType } from "../../api/social-networkAPI";
import { MessageType } from "../messages_reducer";
import { PostType } from "../profile_reducer";
import { AppStateType } from "../store";

export const selectUserInfo: StoreSelectorType<ProfileResponseType> = state => state.profile.userInfo;

export const selectUserStatus: StoreSelectorType<string> = state => state.profile.status;

export const selectPosts: StoreSelectorType<PostType[]> = state => state.profile.posts;

export const selectIsFetching: StoreSelectorType<boolean> = state => state.app.isFetching;

export const selectIsInitialized: StoreSelectorType<boolean> = state => state.app.isInitialized;

export const selectLoggedUserID: StoreSelectorType<number | null> = state => state.auth.data.id;

export const selectIsUserLoggedIn: StoreSelectorType<boolean> = state => state.auth.isUserLoggedIn;

export const selectMessages: StoreSelectorType<MessageType[]> = state => state.messages.all_messages;

export const selectReversedMessages: StoreSelectorType<MessageType[]> = createSelector(selectMessages, messages =>
    [...messages].reverse()
);

export const selectUsers: StoreSelectorType<UserType[]> = state => state.search.items;

export const selectTotalCount: StoreSelectorType<number> = state => state.search.totalCount;

export const selectCurPage: StoreSelectorType<number> = state => state.search.curPage;

export const selectItemsPerPage: StoreSelectorType<number> = state => state.search.itemsPerPage;

export const selectFollowingInProgress: StoreSelectorType<Array<number>> = state => state.search.followingInProgress;

type StoreSelectorType<T> = (state: AppStateType) => T;
