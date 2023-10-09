import cn from "classnames";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import s from "./Fields.module.css";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    FieldWrapperPassThroughProps & {
        registration: Partial<UseFormRegisterReturn>;
    };

export const Textarea: React.FC<Props> = ({ registration, className, label, error, ...restProps }) => {
    return (
        <FieldWrapper label={label} error={error} id={restProps.id}>
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
