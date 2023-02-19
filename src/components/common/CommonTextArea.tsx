import React, {
    ChangeEvent,
    DetailedHTMLProps, TextareaHTMLAttributes
} from "react";
import s from "./CommonTextArea.module.css";


type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>

type CommonTextareaPropsType = Omit<DefaultTextareaPropsType, 'type'> & {

    textAreaClassName?: string,
    onTextChange?: (text: string) => void

};

const CommonTextArea: React.FC<CommonTextareaPropsType> = ({
    value,
    placeholder,
    onChange,
    onTextChange,
    textAreaClassName,
    ...restTextareaProps
}) => {

    const onTextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);

        onTextChange?.(e.currentTarget.value);
    };

    const textAreaClass = `${textAreaClassName ? textAreaClassName : ""} ${s.textarea}`;

    return (
            <textarea
                className={textAreaClass}
                placeholder={placeholder ? placeholder : ""}
                onChange={onTextAreaChangeHandler}
                value={value}
                {...restTextareaProps}
            />
    );
};

export default CommonTextArea;