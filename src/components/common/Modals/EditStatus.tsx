import cn from "classnames";
import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { maxLengthValidator } from "../../../utils/validators";
import YellowButton from "../Buttons/YellowButton";
import s from "./EditStatus.module.css";

type Props = {
    status: string;
    onChange: () => void;
    onSave: (status: string) => void;
};

const MAX_LENGTH = 300;
const validateFieldLength = maxLengthValidator(MAX_LENGTH);
const validateField = (currentValue: string, setError: (value: string) => void) => {
    const returnValue = validateFieldLength(currentValue);
    if (returnValue) {
        setError(returnValue);
    } else {
        setError("");
    }
};

export const EditStatus: React.FC<Props> = ({ status, onChange, onSave }) => {
    const [value, setValue] = useState(status);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");

    const editFieldClassName = cn(
        {
            [s.fieldHasError]: error,
        },
        s.editField
    );

    useEffect(() => {
        if (error) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [error]);

    const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        e.currentTarget.select();
        validateField(e.currentTarget.value, setError);
    };

    const handleDivBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (!e.relatedTarget) {
            setValue("");
            setError("");
            setIsTouched(false);
            setIsValid(false);
            onChange();
        }
    };

    const handleFieldBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
        setIsTouched(true);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value);
        setIsTouched(true);
        validateField(e.currentTarget.value, setError);
    };

    const saveStatusOnClick = () => {
        onChange();
        onSave(value);
    };

    return (
        <div className={s.modalContainer} onBlur={handleDivBlur} tabIndex={1}>
            <textarea
                value={value}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleFieldBlur}
                className={editFieldClassName}
                autoFocus
            />
            {isTouched && error && <span className={s.error}>{error}</span>}
            <div className={s.saveStatus}>
                <YellowButton disabled={!isValid} onClick={saveStatusOnClick}>
                    Сохранить
                </YellowButton>
            </div>
        </div>
    );
};
