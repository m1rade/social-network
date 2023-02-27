import React, { memo } from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import { PostType } from "../../../redux/profile_reducer";
import MessageForm, { MessageDataType } from "../../common/MessageForm";
import { maxLengthValidator, requiredField } from "../../../utils/validators";

type MyPostsPropsType = {
    posts: PostType[];
    photo: string | null;
    addNewPost: (newPostMessage: string) => void
};

const MAX_MESSAGE_LENGTH_50 = maxLengthValidator(50);

export const MyPosts: React.FC<MyPostsPropsType> = memo((props) => {
    const addNewPostHandler = (newPostMessage: MessageDataType) => {
        props.addNewPost(newPostMessage.messageBody);
    };

    const mappedPosts = props.posts.map((p) => (
        <Post key={p.id} postID={p.id} message={p.message} avatar={props.photo}/>
    ));

    return (
        <>
            <div className={s.container}>
                <div>my posts</div>
                <MessageForm
                    placeholder="Share your thoughts..."
                    buttonName="Send"
                    onSubmit={addNewPostHandler}
                    validators={[requiredField, MAX_MESSAGE_LENGTH_50]}
                />
            </div>
            <hr className={s.solid_line} />
            <div>{mappedPosts}</div>
        </>
    );
});
