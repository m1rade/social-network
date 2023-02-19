import React from "react";
import { connect } from "react-redux";
import { addMessage, MessageType } from "../../../redux/messages_reducer";
import { AppStateType } from "../../../redux/store";
import { Dialog } from "./Dialog";

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    const reversed_messages = [...state.messages.all_messages].reverse();
    return {
        receivedMessages: state.messages.all_messages,
        sentMessages: reversed_messages,
    };
};

export const DialogContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    addMessage,
})(Dialog);

type MapStateToPropsType = {
    receivedMessages: MessageType[];
    sentMessages: MessageType[];
};

type MapDispatchToPropsType = {
    addMessage: (newMessage: string) => void;
};

export type DialogPropsType = MapStateToPropsType & MapDispatchToPropsType;
