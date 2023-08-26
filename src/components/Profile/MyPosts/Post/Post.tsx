import React, { memo } from "react";
import userImagePlaceholder from "./../../../../assets/icons/user.png";
import style from "./Post.module.css";

type PostPropsType = {
    postID: number;
    message: string;
    avatar: string | null;
};

export const Post: React.FC<PostPropsType> = memo(({ postID, message, avatar }) => {
    return (
        <div className={style.item}>
            <img src={avatar ? avatar : userImagePlaceholder} alt="small-avatar" />
            <span>{message}</span>
        </div>
    );
});
