import authReducer, { AuthDomainType, setUserData } from "../auth_reducer";

let startState: AuthDomainType;

beforeEach(() => {
    startState = {
        data: {
            id: null,
            email: null,
            login: null
        },
        isUserLoggedIn: false,
        captcha: "",
        fieldsErrors: null
    };
});

describe('auth reducer', () => {
    it('should set fetched data and toggle is user logged in', () => {
        const userData = {id: 1, email: "example@mail.com", login: "qwerty"}

        const endState = authReducer(startState, setUserData(userData, true));

        expect(endState.data).toStrictEqual(userData);
        expect(endState.isUserLoggedIn).not.toBe(false);
    });
});