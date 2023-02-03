import React, {ChangeEvent} from "react";
import style from "./Dialog.module.css";
import {MessageBubble} from "./MessageBubble/MessageBubble";
import CommonTextarea from "../../common/commonTextArea";
import {DialogContainerPropsType} from "../../../containers/DialogContainer";



export const Dialog = (props: DialogContainerPropsType) => {
    const onButtonClick = () => {
        props.onClickSendMessage();
    };

    const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onTextareaChange(e.currentTarget.value);
    };

    const receivedMessageBubbles1 = props.receivedMessages.map((m) => (
        <MessageBubble key={m.id} messageID={m.id} text={m.text} />
    ));
    const sentMessageBubbles1 = props.sentMessages.map((m) => (
        <MessageBubble key={m.id} messageID={m.id} text={m.text} />
    ));

    return (
        <>
            <div className={style.area_wrapper}>
                <div className={style.received_messages}>
                    {receivedMessageBubbles1}
                </div>
                <div className={style.sent_messages}>{sentMessageBubbles1}</div>
            </div>
            <div className={style.inputField}>
                <CommonTextarea
                    value={props.currentValue}
                    placeholder="Enter your message..."
                    onChange={onTextareaChange}
                    onClick={onButtonClick}

                    buttonProps={{buttonName: "Send"}}
                />
            </div>
        </>
    );
};
