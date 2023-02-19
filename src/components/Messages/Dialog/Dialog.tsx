import React from "react";
import MessageForm, { MessageDataType } from "../../common/MessageForm";
import style from "./Dialog.module.css";
import { DialogPropsType } from "./DialogContainer";
import { MessageBubble } from "./MessageBubble/MessageBubble";

export const Dialog: React.FC<DialogPropsType> = (props) => {
    const onSubmitHandler = (messageBody: MessageDataType) => {
        props.addMessage(messageBody.messageBody);
    };

    /* const onTextareaChange = (newTextValue: string) => {
        props.updateMessage(newTextValue);
    }; */

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
                <MessageForm
                    placeholder="Enter your message..."
                    buttonName="Send"
                    component="textarea"
                    onSubmit={onSubmitHandler}
                />
            </div>
        </>
    );
};