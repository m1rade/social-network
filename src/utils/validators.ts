export type ValidatorsType = (value: string) => string | undefined;

export const requiredField: ValidatorsType = (value) => {
    if (value) return undefined;
    return "Required";
};

export const maxLengthValidator =
    (maxLength: number): ValidatorsType =>
    (value) => {
        if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
        return undefined;
    };

export const minLengthValidator =
    (maxLength: number): ValidatorsType =>
    (value) => {
        if (value && value.length < maxLength) return `Max length is ${maxLength} symbols`;
        return undefined;
    };

//login validators
export const verifyEmail: ValidatorsType = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;
