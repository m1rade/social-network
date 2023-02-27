import React from "react";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import ChatsContainer from "./Chats/ChatsContainer";
import DialogContainer from "./Dialog/DialogContainer";
import style from "./Messages.module.css";

const Messages: React.FC<any> = (props) => {
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

export default withAuthRedirect(Messages);
