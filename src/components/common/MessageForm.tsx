import React from "react";
import { Field, InjectedFormProps, reduxForm, Validator, WrappedFieldProps } from "redux-form";
import YellowButton from "./Buttons/YellowButton";
import s from "./MessageForm.module.css";

type MessageFormPropsType = {
    placeholder?: string;
    buttonName?: string;
    validators?: Validator | Validator[] | undefined;
};

export type MessageDataType = {
    messageBody: string;
};

const MessageForm: React.FC<InjectedFormProps<MessageDataType, MessageFormPropsType> & MessageFormPropsType> = ({
    handleSubmit,
    placeholder,
    buttonName,
    validators,
    ...restProps
}) => {
    
    return (
        <form onSubmit={handleSubmit}>
            <Field
                component={renderTextarea}
                name="messageBody"
                placeholder={placeholder || undefined}
                validate={validators}
            />
            <YellowButton>{buttonName || "Send"}</YellowButton>
        </form>
    );
};

const renderTextarea: React.FC<WrappedFieldProps> = ({ input, meta, ...restProps }) => {

    const hasError = meta.touched && meta.error;

    return (
        <div>
            <textarea className={hasError ? s.textareaError : ""} {...input} {...restProps} />
            {hasError && <div>{meta.error}</div>}
        </div>
    );
};

export default reduxForm<MessageDataType, MessageFormPropsType>({ form: "messageField" })(MessageForm);
