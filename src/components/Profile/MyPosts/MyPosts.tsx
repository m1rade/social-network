import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import { PostType } from "../../../redux/profile_reducer";
import MessageForm, { MessageDataType } from "../../common/MessageForm";

type MyPostsPropsType = {
    posts: PostType[];
    photo: string | null;
    addNewPost: (newPostMessage: string) => void
};

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
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
                />
            </div>
            <hr className={s.solid_line} />
            <div>{mappedPosts}</div>
        </>
    );
};
