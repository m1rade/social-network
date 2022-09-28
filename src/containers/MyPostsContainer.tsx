import React from "react";
import { connect } from "react-redux";
import { MyPosts } from "../components/Profile/MyPosts/MyPosts";
import {
    addPostMessageActionCreator,
    updatePostMessageActionCreator,
} from "../redux/profile_reducer";

const mapStateToProps = (state) => ({
    newPostMessage: state.profile.newPostMessage,
    posts: state.profile.posts,
    avatar: state.profile.avatar,
});

const mapDispatchToProps = (dispatch) => ({
    addNewPost: () => dispatch(addPostMessageActionCreator()),
    onPostChange: (textValue) => dispatch(updatePostMessageActionCreator(textValue)),
});

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
