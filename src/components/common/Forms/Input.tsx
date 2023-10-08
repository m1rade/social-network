import cn from "classnames";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import s from "./Fields.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> &
    FieldWrapperPassThroughProps & {
        registration: Partial<UseFormRegisterReturn>;
    };

export const Input: React.FC<Props> = ({ label, className, error, registration, ...restProps }) => {
    return (
        <FieldWrapper label={label} error={error} labelClassName={s.inputLabel}>
            <input
                {...restProps}
                className={cn(s.inputField, className, { [`${s.fieldHasError}`]: error })}
                {...registration}
            />
        </FieldWrapper>
    );
};
