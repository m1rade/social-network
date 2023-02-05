import React from "react";
import style from "./Dialog.module.css";
import {MessageBubble} from "./MessageBubble/MessageBubble";
import CommonTextArea from "../../common/commonTextArea";
import {DialogPropsType} from "../../../containers/DialogContainer";


export const Dialog = (props: DialogPropsType) => {
    const onButtonClick = () => {
        props.onClickSendMessage();
    };

    const onTextareaChange = (newTextValue: string) => {
        props.onTextareaChange(newTextValue);
    };

    const receivedMessageBubbles1 = props.receivedMessages.map((m) => (
        <MessageBubble key={m.id} messageID={m.id} text={m.text}/>
    ));
    const sentMessageBubbles1 = props.sentMessages.map((m) => (
        <MessageBubble key={m.id} messageID={m.id} text={m.text}/>
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
                <CommonTextArea
                    value={props.currentValue}
                    placeholder="Enter your message..."
                    onTextChange={onTextareaChange}

                    buttonProps={{
                        buttonName: "Send",
                        onButtonClick: onButtonClick
                    }}
                />
            </div>
        </>
    );
};
