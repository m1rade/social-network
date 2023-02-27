import { ProfileResponseType } from "../../api/social-networkAPI";
import { PostType } from "../profile_reducer";
import { AppStateType } from "../store";


export const selectUserInfo: StoreSelectorType<ProfileResponseType> = state => state.profile.userInfo;

export const selectUserStatus: StoreSelectorType<string> = state => state.profile.status;

export const selectPosts: StoreSelectorType<PostType[]> = state => state.profile.posts;

export const selectIsFetching: StoreSelectorType<boolean> = state => state.profile.isFetching;

export const selectLoggedUserID: StoreSelectorType<number | null> = state => state.auth.data.id;

export const selectIsUserLoggedIn: StoreSelectorType<boolean> = state => state.auth.isUserLoggedIn;


type StoreSelectorType<T> = (state: AppStateType) => T;