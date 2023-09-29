import cn from "classnames";
import React from "react";
import { FieldError } from "react-hook-form";
import s from "./FieldWrapper.module.css";

type Props = {
    label?: string;
    labelClassName?: string;
    children: React.ReactNode;
    error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<Props, "labelClassName" | "children">;

export const FieldWrapper: React.FC<Props> = ({ label, labelClassName, children, error }) => {
    return (
        <div className={s.container}>
            <label className={cn(s.label, labelClassName)}>{label}</label>
            {children}
            {error && (
                <span role="alert" aria-label={error.message} className={s.errorMessage}>
                    {error.message}
                </span>
            )}
        </div>
    );
};
