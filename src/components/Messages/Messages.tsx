import React from "react";
import ChatsContainer from "../../containers/ChatsContainer";
import { DialogContainer } from "../../containers/DialogContainer";
import style from "./Messages.module.css";

export const Messages = () => {
    return (
        <div className={style.messages}>
            <div className={style.dialogs_area}>
                <ChatsContainer />
            </div>
            <div className={style.messages_area}>
                <DialogContainer />
            </div>
        </div>
    );
};
