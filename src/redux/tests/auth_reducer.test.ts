import authReducer, { AuthDomainType, setErrors, setUserData } from "../auth_reducer";

let startState: AuthDomainType;

beforeEach(() => {
    startState = {
        data: {
            id: null,
            email: null,
            login: null,
        },
        isUserLoggedIn: false,
        captcha: "",
        errors: {
            fieldsErrors: [],
            message: null,
        },
    };
});

describe("auth reducer", () => {
    it("should set fetched data and toggle is user logged in", () => {
        const userData = { id: 1, email: "example@mail.com", login: "qwerty" };

        const endState = authReducer(startState, setUserData(userData, true));

        expect(endState.data).toStrictEqual(userData);
        expect(endState.isUserLoggedIn).not.toBe(false);
    });

    it("should set errors messages and fields errors", () => {
        const serverErrorResp = {
            message: "Incorrect e-mail or password",
            fieldsErrors: [
                { error: "Incorrect e-mail or password", field: "email" },
                { error: "Incorrect e-mail or password", field: "password" },
            ],
        };

        const endState = authReducer(startState, setErrors(serverErrorResp.message, serverErrorResp.fieldsErrors));

        expect(endState.errors.message).toBe(serverErrorResp.message);
        expect(endState.errors.fieldsErrors[1].error).toBe(serverErrorResp.fieldsErrors[1].error);
        expect(endState.errors.fieldsErrors[1].field).toBe(serverErrorResp.fieldsErrors[1].field);
    });
});
