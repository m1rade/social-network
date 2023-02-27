import React from "react";
import { connect } from "react-redux";
import { addMessage, MessageType } from "../../../redux/messages_reducer";
import { selectMessages, selectReversedMessages } from "../../../redux/selectors/selectors";
import { AppStateType } from "../../../redux/store";
import { Dialog } from "./Dialog";

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        receivedMessages: selectMessages(state),
        sentMessages: selectReversedMessages(state),
    };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
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
