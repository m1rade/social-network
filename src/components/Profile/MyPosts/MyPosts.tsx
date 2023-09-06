import React, { memo } from "react";
import MessageForm, { MessageDataType } from "../../../components/common/MessageForm/MessageForm";
import { PostType } from "../../../redux/profile_reducer";
import { maxLengthValidator } from "../../../utils/validators";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";

type MyPostsPropsType = {
    posts: PostType[];
    photo: string | null;
    addNewPost: (newPostMessage: string) => void;
};

const MAX_MESSAGE_LENGTH_50 = maxLengthValidator(50);

export const MyPosts: React.FC<MyPostsPropsType> = memo(({ posts, photo, addNewPost }) => {
    const addNewPostHandler = (newPostMessage: MessageDataType) => {
        addNewPost(newPostMessage.messageBody);
    };

    const mappedPosts = posts.map(p => <Post key={p.id} postID={p.id} message={p.message} avatar={photo} />);

    return (
        <>
            <div className={s.container}>
                <div>my posts</div>
                <MessageForm
                    placeholder="Share your thoughts..."
                    buttonName="Send"
                    onSubmit={addNewPostHandler}
                    validators={[MAX_MESSAGE_LENGTH_50]}
                />
            </div>
            <hr className={s.solid_line} />
            {mappedPosts}
        </>
    );
});
