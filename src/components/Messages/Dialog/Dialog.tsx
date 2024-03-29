import React from "react";
import { maxLengthValidator } from "../../../utils/validators";
import MessageForm, { MessageDataType } from "../../common/MessageForm/MessageForm";
import style from "./Dialog.module.css";
import { DialogPropsType } from "./DialogContainer";
import { MessageBubble } from "./MessageBubble/MessageBubble";

const MAX_MESSAGE_LENGTH_150 = maxLengthValidator(150);

export const Dialog: React.FC<DialogPropsType> = ({ addMessage, receivedMessages, sentMessages }) => {
    const onSubmitHandler = (messageBody: MessageDataType) => {
        addMessage(messageBody.messageBody);
    };

    const receivedMessageBubbles1 = receivedMessages.map(m => (
        <MessageBubble key={m.id} messageID={m.id} text={m.text} />
    ));
    const sentMessageBubbles1 = sentMessages.map(m => <MessageBubble key={m.id} messageID={m.id} text={m.text} />);

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
                    onSubmit={onSubmitHandler}
                    validators={[MAX_MESSAGE_LENGTH_150]}
                />
            </div>
        </>
    );
};
