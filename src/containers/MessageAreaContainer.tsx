import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { MessageArea } from "../components/Messages/MessagesArea/MessageArea";
import {
    addMessageAC,
    MessagesActionType,
    MessageType,
    updateMessageAC,
} from "../redux/messages_reducer";
import { AppStateType } from "../redux/store";

export type MessageAreaContainerPropsType = {
    receivedMessages: MessageType[],
    sentMessages: MessageType[],
    currentValue: string;
};

const mapStateToProps = (state: AppStateType): MessageAreaContainerPropsType => {
    const reversed_messages = [...state.messages.all_messages].reverse();
    return {
        receivedMessages: state.messages.all_messages,
        sentMessages: reversed_messages,
        currentValue: state.messages.newMessageText,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MessagesActionType>) => ({
    onClickSendMessage: () => dispatch(addMessageAC()),
    onTextAreaChange: (textValue: string) => dispatch(updateMessageAC(textValue))
});

export const MessageAreaContainer = connect(mapStateToProps, mapDispatchToProps)(MessageArea);
