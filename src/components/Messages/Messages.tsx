import React from "react";
import ChatsContainer from "../../containers/ChatsContainer";
import { DialogContainer } from "../../containers/DialogContainer";
import withAuthRedirect from "../../HOC/withAuthRedirect";
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