import React from "react";
import style from "./Post.module.css";

export const Post = (props: any) => {
    return (
        <div className={style.item}>
            <img src={props.avatar} alt="avatar" />
            <span>{props.message}</span>
        </div>
    );
};
