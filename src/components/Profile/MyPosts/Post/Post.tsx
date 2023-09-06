import React, { memo } from "react";
import { UserPhoto } from "../../../common/UserPhoto/UserPhoto";
import style from "./Post.module.css";

type PostPropsType = {
    postID: number;
    message: string;
    avatar: string | null;
};

export const Post: React.FC<PostPropsType> = memo(({ postID, message, avatar }) => {
    return (
        <div className={style.item}>
            <UserPhoto type="small" srcPhoto={avatar} />
            <span className={style.message}>{message}</span>
        </div>
    );
});
