import React, {
    ButtonHTMLAttributes,
    ChangeEvent,
    DetailedHTMLProps,
    MouseEvent,
    TextareaHTMLAttributes
} from "react";
import s from "./commonTextArea.module.css";


type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type CommonTextareaPropsType = Omit<DefaultTextareaPropsType, 'type'> & {

    textAreaClassName?: string,

    buttonProps?: DefaultButtonPropsType & {buttonClassName?: string, buttonName: string}
};

export const CommonTextArea: React.FC<CommonTextareaPropsType> = ({
    value,
    placeholder,
    onChange,
    textAreaClassName,

    buttonProps,

    ...restTextareaProps
}) => {
    const {onClick, buttonName, buttonClassName, ...restButtonProps} = buttonProps || {};

    const onTextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
    };

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
    };

    const buttonClass = `${buttonClassName ? buttonClassName : ""} ${s.button_add}`;
    const textAreaClass = `${textAreaClassName ? textAreaClassName : ""} ${s.textarea}`;

    return (
        <>
            <textarea
                className={textAreaClass}
                placeholder={placeholder ? placeholder : ""}
                onChange={onTextAreaChangeHandler}
                value={value}
                {...restTextareaProps}
            />
            <button className={buttonClass}
                    onClick={onClickButtonHandler}
                    {...restButtonProps}>

                {buttonName}
            </button>
        </>
    );
};
