import React, {ChangeEvent} from "react";
import style from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "../../../containers/MyPostsContainer";
import CommonTextArea from "../../common/commonTextArea";


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const onClickAddNewPost = () => {
        props.addNewPost();
    };

    const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onPostChange(e.currentTarget.value);
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
                    onChange={onTextareaChange}
                    onClick={onClickAddNewPost}

                    buttonProps={{buttonName: "Send"}}
                />
            </div>
            <hr className={style.solid_line}/>
            <div>{mappedPosts}</div>
        </>
    );
};
