import React from "react";
import style from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "../../../containers/MyPostsContainer";
import CommonTextArea from "../../common/CommonTextArea";


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const onClickAddNewPost = () => {
        props.addNewPost();
    };

    const onTextareaChange = (newTextValue: string) => {
        props.onPostChange(newTextValue);
    };

    const mappedPosts = props.posts.map((p) => (
        <Post key={p.id} postID={p.id} message={p.message} avatar={props.avatar}/>
    ));

    return (
        <>
            <div>
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
            <hr className={style.solid_line}/>
            <div>{mappedPosts}</div>
        </>
    );
};
