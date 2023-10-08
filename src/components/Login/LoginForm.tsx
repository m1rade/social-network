import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { Validator } from "redux-form";
import { LoginData } from "../../api/social-networkAPI";
import { minLengthValidator, requiredField, verifyEmail } from "../../utils/validators";
import YellowButton from "../common/Buttons/YellowButton";
import { Form } from "../common/Forms/Form";
import { Input } from "../common/Forms/Input";
import { LoginPropsType } from "./LoginPage";
import s from "./LoginPage.module.css"

const passwordLength8 = minLengthValidator(8);
const LOGIN_FIELDS = [
    {
        name: "email" as const,
        type: "email",
        label: "E-mail",
        htmlTag: Input,
        validation: {
            required: "Обязательное поле",
        },
    },
    {
        name: "password" as const,
        type: "password",
        label: "Пароль",
        htmlTag: Input,
        validation: {
            required: "Обязательное поле",
        },
        // validation: [requiredField, passwordLength8],
    },
    {
        name: "rememberMe" as const,
        type: "checkbox",
        label: "Запомнить меня",
        htmlTag: Input,
    },
];

type Props = Omit<LoginPropsType, "isUserLoggedIn" | "loginUser"> & {
    onSubmit: (formData: LoginData) => void;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, captcha, fieldsErrors, setFieldsErrors }) => {
    return (
        <div className={s.formContainer}>
            <Form<LoginData>
                onSubmit={onSubmit}
                options={{ defaultValues: { email: "", password: "", rememberMe: false, captcha: undefined } }}
                serverErrors={fieldsErrors}>
                {({ register, formState }) => (
                    <div className={s.innerWrapper}>
                        {LOGIN_FIELDS.map(field => (
                            <field.htmlTag
                                key={field.name}
                                registration={register(field.name, { required: field.validation?.required })}
                                type={field.type}
                                label={field.label}
                                error={formState.errors[field.name]}
                            />
                        ))}
                        {captcha && <CaptchaForm captcha={captcha} register={register} formState={formState} />}
                        <div className={s.LoginBtn}>
                            <YellowButton type="submit">Войти</YellowButton>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    );
};

type CaptchaFormType = {
    captcha: string;
    register: UseFormRegister<LoginData>;
    formState: FormState<LoginData>;
};
const CaptchaForm: React.FC<CaptchaFormType> = ({ captcha, register, formState }) => {
    return (
        <div>
            <img src={captcha} alt="captcha" />
            <Input
                registration={register("captcha", {required: true})}
                type="text"
                label="Введите текст с картинки"
                error={formState.errors.captcha}
            />
        </div>
    );
};

// const LoginForm: React.FC<InjectedFormProps<LoginData>> = ({ handleSubmit, error }) => {
//     const renderField = (field: LoginFieldType) => {
//         return (
//             <Field
//                 name={field.name}
//                 key={field.name}
//                 type={field.type}
//                 label={field.label}
//                 htmlTag={field.htmlTag}
//                 component={GenericFormField}
//                 validate={field.validation ? field.validation : []}
//             />
//         );
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 {LOGIN_FIELDS.map((f) => renderField(f))}
//                 {error && <div className={s.formDataError}>{error}</div>}
//                 <div>
//                     <YellowButton>Log in</YellowButton>
//                 </div>
//             </form>
//         </>
//     );
// };

// const GenericFormField: React.FC<WrappedFieldProps & LoginFieldType> = ({ input, meta, type, htmlTag, label }) => {
//     const hasError = meta.touched && meta.error;

//     return (
//         <div>
//             {type !== "checkbox" && <label className={s.formLabel}>{label}</label>}
//             <div className={s.fieldItem}>
//                 {React.createElement(htmlTag, {
//                     type,
//                     placeholder: label,
//                     ...input,
//                     className: `${hasError ? s.error : ""}`,
//                 })}
//                 {type === "checkbox" && <label className={s.formLabel}>{label}</label>}
//             </div>
//             {hasError && <span className={s.error}>{meta.error}</span>}
//         </div>
//     );
// };

//HOCs
// export default reduxForm<LoginData>({
//     form: "login",
// })(LoginForm);

//types
type LoginFieldType = {
    name: "email" | "password" | "rememberMe";
    type: string;
    label: string;
    htmlTag: string;
    validation?: Validator | Validator[] | undefined;
};
