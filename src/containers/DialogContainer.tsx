import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Dialog} from "../components/Messages/Dialog/Dialog";
import {addMessageAC, MessagesActionType, MessageType, updateMessageAC,} from "../redux/messages_reducer";
import {AppStateType} from "../redux/store";

type mapStateToPropsType = {
    receivedMessages: MessageType[],
    sentMessages: MessageType[],
    currentValue: string;
};

type mapDispatchToPropsType = {
    onClickSendMessage: () => void,
    onTextareaChange: (textValue: string) => void
}

export type DialogPropsType = mapStateToPropsType & mapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    const reversed_messages = [...state.messages.all_messages].reverse();
    return {
        receivedMessages: state.messages.all_messages,
        sentMessages: reversed_messages,
        currentValue: state.messages.newMessageText,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MessagesActionType>): mapDispatchToPropsType => ({
    onClickSendMessage: () => dispatch(addMessageAC()),
    onTextareaChange: (textValue: string) => dispatch(updateMessageAC(textValue))
});

export const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);
