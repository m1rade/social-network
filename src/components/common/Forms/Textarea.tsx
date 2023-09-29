import cn from "classnames";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import s from "./Fields.module.css";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    FieldWrapperPassThroughProps & {
        registration: Partial<UseFormRegisterReturn>;
        validation?: Object;
    };

export const Textarea: React.FC<Props> = ({ registration, className, label, error, validation, ...restProps }) => {
    return (
        <FieldWrapper label={label} error={error}>
            <textarea
                {...restProps}
                className={cn(s.textareaField, className, {
                    [`${s.fieldHasError}`]: error,
                })}
                {...registration}
            />
        </FieldWrapper>
    );
};
