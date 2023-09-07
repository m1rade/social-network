export type ValidatorsType = (value: string) => string | undefined;

export const requiredField: ValidatorsType = (value) => {
    if (value) return undefined;
    return "Обязательное поле";
};

export const maxLengthValidator =
    (maxLength: number): ValidatorsType =>
    (value) => {
        if (value && value.length > maxLength) return `Не более ${maxLength} символов`;
        return undefined;
    };

export const minLengthValidator =
    (maxLength: number): ValidatorsType =>
    (value) => {
        if (value && value.length < maxLength) return `Не менее ${maxLength} символов`;
        return undefined;
    };

//login validators
export const verifyEmail: ValidatorsType = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Неверный e-mail" : undefined;