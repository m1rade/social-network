import React from "react";
import style from "./MessageBubble.module.css";

type PropsType = {
    messageID: number,
    text: string
}

export const MessageBubble = (props: PropsType) => {
    return (
        <div className={style.message_bubble}>
            <span className={style.m_text}>{props.text}</span>
        </div>
    );
};
