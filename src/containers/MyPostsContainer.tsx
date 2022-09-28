import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { MyPosts } from "../components/Profile/MyPosts/MyPosts";
import {
    addPostMessageAC,
    PostType,
    ProfileActionType,
    updatePostMessageAC,
} from "../redux/profile_reducer";
import { AppStateType } from "../redux/store";

export type MyPostsContainerPropsType = {
    newPostMessage: string;
    posts: PostType[];
    avatar: string;
};

type MyPostsContainerDispatchType = {
    addNewPost: () => void,
    onPostChange: (textValue: string) => void
};

const mapStateToProps = (state: AppStateType): MyPostsContainerPropsType => ({
    newPostMessage: state.profile.newPostMessage,
    posts: state.profile.posts,
    avatar: state.profile.avatar,
});

const mapDispatchToProps = (dispatch: Dispatch<ProfileActionType>): MyPostsContainerDispatchType => ({
    addNewPost: () => dispatch(addPostMessageAC()),
    onPostChange: (textValue: string) =>
        dispatch(updatePostMessageAC(textValue)),
});

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
