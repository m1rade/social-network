import React from "react";
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from "redux-form";
import { maxLengthValidator, requiredField } from "../../utils/validators";
import YellowButton from "./Buttons/YellowButton";
import s from "./MessageForm.module.css";

type MessageFormPropsType = {
    placeholder?: string;
    buttonName?: string;
    validate?: {}
};

export type MessageDataType = {
    messageBody: string;
};

const MAX_MESSAGE_LENGTH_50 = maxLengthValidator(50);

const MessageForm: React.FC<InjectedFormProps<MessageDataType, MessageFormPropsType> & MessageFormPropsType> = ({
    handleSubmit,
    placeholder,
    buttonName,
    ...restProps
}) => {
    
    return (
        <form onSubmit={handleSubmit}>
            <Field
                component={renderTextarea}
                name="messageBody"
                placeholder={placeholder || undefined}
                validate={[requiredField, MAX_MESSAGE_LENGTH_50]}
            />
            <YellowButton>{buttonName || "Send"}</YellowButton>
        </form>
    );
};

const renderTextarea: React.FC<WrappedFieldProps> = ({ input, meta, ...restProps }) => {

    const hasError = meta.touched && meta.error;

    return (
        <div>
            <textarea className={hasError && s.textareaError} {...input} {...restProps} />
            {hasError && <div>{meta.error}</div>}
        </div>
    );
};

export default reduxForm<MessageDataType, MessageFormPropsType>({ form: "messageField" })(MessageForm);
