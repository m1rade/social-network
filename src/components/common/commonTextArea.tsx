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
    onTextChange?: (text: string) => void

    buttonProps?: DefaultButtonPropsType & {buttonClassName?: string, buttonName: string, onButtonClick?: () => void}
};

const CommonTextArea: React.FC<CommonTextareaPropsType> = ({
    value,
    placeholder,
    onChange,
    onTextChange,
    textAreaClassName,

    buttonProps,

    ...restTextareaProps
}) => {
    const {onButtonClick, onClick, buttonName, buttonClassName, ...restButtonProps} = buttonProps || {};

    const onTextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);

        onTextChange?.(e.currentTarget.value);
    };

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)

        onButtonClick?.();
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

export default CommonTextArea;