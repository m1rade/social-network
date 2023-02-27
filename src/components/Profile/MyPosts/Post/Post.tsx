import React, { memo } from "react";
import style from "./Post.module.css";
import userImagePlaceholder from "./../../../../assets/icons/user.png"

type PostPropsType = {
    postID: number
    message: string
    avatar: string | null
}

export const Post: React.FC<PostPropsType> = memo((props) => {
    return (
        <div className={style.item}>
            <img src={props.avatar ? props.avatar : userImagePlaceholder} alt="small-avatar" />
            <span>{props.message}</span>
        </div>
    );
});
