import React, { memo } from "react";
import style from "./MessageBubble.module.css";

type PropsType = {
    messageID: number;
    text: string;
};

export const MessageBubble: React.FC<PropsType> = memo(({ text }) => {
    return (
        <div className={style.message_bubble}>
            <span className={style.m_text}>{text}</span>
        </div>
    );
});
