import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import React from "react";
import { FieldValues, SubmitHandler, UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";
import s from "./Form.module.css";

type Props<TFormValues extends FieldValues, Schema> = {
    className?: string;
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: UseFormProps<TFormValues>;
    id?: string;
    schema?: Schema;
};

export const Form = <
    TFormValues extends FieldValues = FieldValues,
    Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>({
    onSubmit,
    children,
    className,
    options,
    id,
    schema,
}: Props<TFormValues, Schema>) => {
    // @ts-ignore
    const methods = useForm<TFormValues>({ ...options, resolver: schema && zodResolver(schema) });

    // useEffect(() => {
    //     //"Invalid url format (Contacts->Facebook)"
    //     // TODO
    //     const matchFieldName = /\((\w+)/g;
    //     const cutErrorMessage = /\s\((\w+)\)/;
    //     if (serverErrors) {
    //         serverErrors.forEach(e => {
    //             const match = e.match(matchFieldName);
    //             if (match) {
    //                 const field = match[0].slice(1);
    //                 const fieldName = field.charAt(0).toLowerCase() + field.slice(1);

    //                 //@ts-ignore
    //                 methods.setError(fieldName, { type: "manual", message: e.replace(cutErrorMessage, "") });
    //             }
    //         });
    //     }
    // }, [serverErrors, methods.setError]);

    return (
        <form
            className={cn(className)}
            onSubmit={methods.handleSubmit(onSubmit)}
            id={id}>
            <fieldset className={s.fieldset} disabled={methods.formState.isSubmitting}>
                {children(methods)}
            </fieldset>
        </form>
    );
};
