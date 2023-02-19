import React from "react";
import { connect } from "react-redux";
import { addMessage, MessageType, updateMessage } from "../../../redux/messages_reducer";
import { AppStateType } from "../../../redux/store";
import { Dialog } from "./Dialog";

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    const reversed_messages = [...state.messages.all_messages].reverse();
    return {
        receivedMessages: state.messages.all_messages,
        sentMessages: reversed_messages,
        currentValue: state.messages.newMessageText,
    };
};

export const DialogContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    addMessage,
    updateMessage,
})(Dialog);

type mapStateToPropsType = {
    receivedMessages: MessageType[];
    sentMessages: MessageType[];
    currentValue: string;
};

type mapDispatchToPropsType = {
    addMessage: () => void;
    updateMessage: (textValue: string) => void;
};

export type DialogPropsType = mapStateToPropsType & mapDispatchToPropsType;
