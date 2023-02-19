import React, { Component } from "react";
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from "redux-form";
import YellowButton from "./Buttons/YellowButton";

type MessageFormPropsType = {
    placeholder?: string;
    component: Component<WrappedFieldProps> | string;
    buttonName?: string;
};

export type MessageDataType = {
    messageBody: string;
};

const MessageForm: React.FC<InjectedFormProps<MessageDataType, MessageFormPropsType> & MessageFormPropsType> = ({
    handleSubmit,
    placeholder,
    component,
    buttonName,
    ...restProps
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field component={component} name="messageBody" placeholder={placeholder || "Type something..."} />
            <YellowButton>{buttonName || "Send"}</YellowButton>
        </form>
    );
};

export default reduxForm<MessageDataType, MessageFormPropsType>({ form: "messageField" })(MessageForm);
