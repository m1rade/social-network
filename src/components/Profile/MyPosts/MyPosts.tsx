import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import CommonTextArea from "../../common/CommonTextArea";
import { PostType } from "../../../redux/profile_reducer";

type MyPostsPropsType = {
    newPostMessage: string;
    posts: PostType[];
    photo: string | null;
    addNewPost: () => void
    onPostChange: (newTextValue: string) => void
};

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const onClickAddNewPost = () => {
        props.addNewPost();
    };

    const onTextareaChange = (newTextValue: string) => {
        props.onPostChange(newTextValue);
    };

    const mappedPosts = props.posts.map((p) => (
        <Post key={p.id} postID={p.id} message={p.message} avatar={props.photo}/>
    ));

    return (
        <>
            <div className={s.container}>
                <div>my posts</div>
                <CommonTextArea
                    value={props.newPostMessage}
                    placeholder="Share your thoughts..."
                    onTextChange={onTextareaChange}

                    buttonProps={{
                        buttonName: "Send",
                        onButtonClick: onClickAddNewPost
                    }}
                />
            </div>
            <hr className={s.solid_line}/>
            <div>{mappedPosts}</div>
        </>
    );
};
