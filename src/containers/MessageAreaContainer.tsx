import React from "react";
import { connect } from "react-redux";
import { MessageArea } from "../components/Messages/MessagesArea/MessageArea";
import {
    addMessageActionCreator,
    updateMessageActionCreator,
} from "../redux/messages_reducer";

const mapStateToProps = (state) => {
    const reversed_messages = [...state.messages.all_messages].reverse();
    return {
        receivedMessages: state.messages.all_messages,
        sentMessages: reversed_messages,
        currentValue: state.messages.newMessageText,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onClickSendMessage: () => dispatch(addMessageActionCreator()),
    onTextAreaChange: (textValue) => dispatch(updateMessageActionCreator(textValue))
});

export const MessageAreaContainer = connect(mapStateToProps, mapDispatchToProps)(MessageArea);
