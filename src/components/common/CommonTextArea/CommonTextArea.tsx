import React, { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import s from "./CommonTextArea.module.css";

type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type CommonTextareaPropsType = Omit<DefaultTextareaPropsType, "type"> & {
    textareaClassName?: string;
    onTextChange?: (text: string) => void;
};

const CommonTextarea: React.FC<CommonTextareaPropsType> = ({
    textareaClassName,
    onChange,
    onTextChange,
    ...restProps
}) => {
    const onTextareaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);

        onTextChange?.(e.currentTarget.value);
    };

    const textareaFinalClass = `${textareaClassName || ""}` + s.textarea;

    return (
        <div className={s.TextareaContainer}>
            <textarea className={textareaFinalClass} onChange={onTextareaChangeHandler} {...restProps} />
        </div>
    );
};

export default CommonTextarea;
