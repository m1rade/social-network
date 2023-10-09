import React from "react";
import { z } from "zod";
import { LoginData } from "../../api/social-networkAPI";
import YellowButton from "../common/Buttons/YellowButton";
import { Form } from "../common/Forms/Form";
import { Input } from "../common/Forms/Input";
import { LoginPropsType } from "./LoginPage";
import s from "./LoginPage.module.css";

const LOGIN_FIELDS = [
    {
        name: "email" as const,
        type: "text",
        label: "E-mail",
        htmlTag: Input,
    },
    {
        name: "password" as const,
        type: "password",
        label: "Пароль",
        htmlTag: Input,
    },
    {
        name: "rememberMe" as const,
        type: "checkbox",
        label: "Запомнить меня",
        htmlTag: Input,
    },
];

const schemaValidation = z.object({
    email: z.string().min(1, { message: "Обязательное поле" }).email({ message: "Некорректный формат" }),
    password: z.string().min(1, { message: "Обязательное поле" }).min(8, { message: "Не менее 8 символов" }),
    rememberMe: z.boolean(),
    captcha: z.undefined().or(z.string().min(1, { message: "Поле необходимо заполнить" })),
});

type Props = Omit<LoginPropsType, "isUserLoggedIn" | "loginUser"> & {
    onSubmit: (formData: LoginData) => void;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, captcha, fieldsErrors, setFieldsErrors }) => {
    return (
        <div className={s.formContainer}>
            <Form<LoginData, typeof schemaValidation>
                onSubmit={onSubmit}
                serverErrors={fieldsErrors}
                schema={schemaValidation}>
                {({ register, formState}) => (
                    <div className={s.innerWrapper}>
                        {LOGIN_FIELDS.map(field => (
                            <field.htmlTag
                                key={field.name}
                                id={field.name}
                                registration={register(field.name)}
                                type={field.type}
                                label={field.label}
                                error={formState.errors[field.name]}
                            />
                        ))}
                        {captcha && (
                            <>
                                <img src={captcha} alt="captcha" />
                                <Input
                                    id="captcha"
                                    registration={register("captcha")}
                                    type="text"
                                    label="Введите текст с картинки"
                                    error={formState.errors.captcha}
                                />
                            </>
                        )}
                        <div className={s.LoginBtn}>
                            <YellowButton type="submit">Войти</YellowButton>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    );
};
