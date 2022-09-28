import React from "react";
import DialogsContainer from "../../containers/DialogsContainer";
import { MessageAreaContainer } from "../../containers/MessageAreaContainer";
import style from "./Messages.module.css";

export const Messages = () => {
    return (
        <div className={style.messages}>
            <div className={style.dialogs_area}>
                <DialogsContainer />
            </div>
            <div className={style.messages_area}>
                <MessageAreaContainer />
            </div>
        </div>
    );
};
