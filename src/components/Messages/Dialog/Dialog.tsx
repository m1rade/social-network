import React from "react";
import YellowButton from "../../common/Buttons/YellowButton";
import CommonTextArea from "../../common/CommonTextArea";
import style from "./Dialog.module.css";
import { DialogPropsType } from "./DialogContainer";
import { MessageBubble } from "./MessageBubble/MessageBubble";

export const Dialog: React.FC<DialogPropsType> = (props) => {
    const onButtonClick = () => {
        props.addMessage();
    };

    const onTextareaChange = (newTextValue: string) => {
        props.updateMessage(newTextValue);
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
                <div className={style.received_messages}>{receivedMessageBubbles1}</div>
                <div className={style.sent_messages}>{sentMessageBubbles1}</div>
            </div>
            <div className={style.inputField}>
                <CommonTextArea
                    value={props.currentValue}
                    placeholder="Enter your message..."
                    onTextChange={onTextareaChange}
                />
                <YellowButton onClick={onButtonClick}>Send</YellowButton>
            </div>
        </>
    );
};