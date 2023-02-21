import React from "react";
import { Field, InjectedFormProps, reduxForm, Validator, WrappedFieldProps } from "redux-form";
import { LoginData } from "../../api/social-networkAPI";
import { minLengthValidator, requiredField, verifyEmail } from "../../utils/validators";
import YellowButton from "../common/Buttons/YellowButton";
import s from "./LoginPage.module.css";

const passwordLength8 = minLengthValidator(8);
const LOGIN_FIELDS: LoginFieldType[] = [
    {
        name: "email",
        type: "email",
        label: "Email",
        htmlTag: "input",
        validation: [requiredField, verifyEmail],
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        htmlTag: "input",
        validation: [requiredField, passwordLength8],
    },
    {
        name: "rememberMe",
        type: "checkbox",
        label: "Remember me",
        htmlTag: "input",
    },
];

const LoginForm: React.FC<InjectedFormProps<LoginData>> = ({ handleSubmit }) => {
    const renderField = (field: LoginFieldType) => {
        return (
            <Field
                name={field.name}
                key={field.name}
                type={field.type}
                label={field.label}
                htmlTag={field.htmlTag}
                component={GenericFormField}
                validate={field.validation ? field.validation : []}
            />
        );
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {LOGIN_FIELDS.map((f) => renderField(f))}
                <div>
                    <YellowButton>Log in</YellowButton>
                </div>
            </form>
        </>
    );
};

const GenericFormField: React.FC<WrappedFieldProps & LoginFieldType> = ({ input, meta, type, htmlTag, label }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div>
            {type !== "checkbox" && <label className={s.formLabel}>{label}</label>}
            <div className={s.fieldItem}>
                {React.createElement(htmlTag, {
                    type,
                    placeholder: label,
                    ...input,
                    className: `${hasError ? s.error : ""}`,
                })}
                {type === "checkbox" && <label className={s.formLabel}>{label}</label>}
            </div>
            {hasError && <span className={s.error}>{meta.error}</span>}
        </div>
    );
};

//HOCs
export default reduxForm<LoginData>({
    form: "login",
})(LoginForm);

//types
type LoginFieldType = {
    name: "email" | "password" | "rememberMe";
    type: string;
    label: string;
    htmlTag: string;
    validation?: Validator | Validator[] | undefined;
};
