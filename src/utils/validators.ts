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
