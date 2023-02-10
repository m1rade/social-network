import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {MyPosts} from "../components/Profile/MyPosts/MyPosts";
import {addPostMessage, PostType, ProfileActionType, updatePostMessage,} from "../redux/profile_reducer";
import { UserPhotoType } from "../redux/search_reducer";
import {AppStateType} from "../redux/store";

type MyPostsContainerPropsType = {
    newPostMessage: string;
    posts: PostType[];
    avatar: UserPhotoType;
};

type MyPostsContainerDispatchType = {
    addNewPost: () => void,
    onPostChange: (textValue: string) => void
};

const mapStateToProps = (state: AppStateType): MyPostsContainerPropsType => ({
    newPostMessage: state.profile.newPostMessage,
    posts: state.profile.posts,
    avatar: state.profile.photos,
});

const mapDispatchToProps = (dispatch: Dispatch<ProfileActionType>): MyPostsContainerDispatchType => ({
    addNewPost: () => dispatch(addPostMessage()),
    onPostChange: (textValue: string) =>
        dispatch(updatePostMessage(textValue)),
});

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
