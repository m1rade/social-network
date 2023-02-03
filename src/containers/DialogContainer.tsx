import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Dialog} from "../components/Messages/Dialog/Dialog";
import {addMessageAC, MessagesActionType, MessageType, updateMessageAC,} from "../redux/messages_reducer";
import {AppStateType} from "../redux/store";

export type DialogContainerPropsType = {
    receivedMessages: MessageType[],
    sentMessages: MessageType[],
    currentValue: string;
};

const mapStateToProps = (state: AppStateType): DialogContainerPropsType => {
    const reversed_messages = [...state.messages.all_messages].reverse();
    return {
        receivedMessages: state.messages.all_messages,
        sentMessages: reversed_messages,
        currentValue: state.messages.newMessageText,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MessagesActionType>) => ({
    onClickSendMessage: () => dispatch(addMessageAC()),
    onTextareaChange: (textValue: string) => dispatch(updateMessageAC(textValue))
});

export const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);
