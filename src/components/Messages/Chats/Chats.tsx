import React from "react";
import style from "./Chats.module.css";
import {NavLink} from "react-router-dom";

type ChatsPropsType = {
    userID: number,
    userName: string
}

export const Chats = (props: ChatsPropsType) => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogItem}>
                <NavLink activeClassName={style.active} to={`/dialog/${props.userID}`}>{props.userName}</NavLink>
            </div>
        </div>
    );
};