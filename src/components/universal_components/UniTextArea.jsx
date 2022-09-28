import React from "react";
import s from "./UniTextArea.module.css";

type UniTextAreaPropsType = {
    value: string,
    placeholder?: string,
    buttonName: string,
    onChange: (textAreaValue: string) => void,
    onButtonClick: () => void,
    buttonClassName?: string,
    textAreaClassName?: string,
};

export const UniTextArea: React.FC<UniTextAreaPropsType> = ({
    value,
    placeholder,
    buttonName,
    onChange,
    onButtonClick,
    buttonClassName,
    textAreaClassName,
}) => {
    const onTextAreaChangeHandler = (e) => {
        const textAreaValue = e.currentTarget.value;
        onChange(textAreaValue);
    };

    const onClickButtonHandler = () => {
        onButtonClick();
    };

    const buttonClassName = `${buttonClassName ? buttonClassName : ""} ${
        s.button_add
    }`;
    const textAreaClassName = `${textAreaClassName ? textAreaClassName : ""} ${
        s.textarea
    }`;

    return (
        <>
            <textarea
                className={textAreaClassName}
                placeholder={placeholder ? placeholder : ""}
                onChange={onTextAreaChangeHandler}
                value={value}
            />
            <button className={buttonClassName} onClick={onClickButtonHandler}>
                {buttonName}
            </button>
        </>
    );
};
