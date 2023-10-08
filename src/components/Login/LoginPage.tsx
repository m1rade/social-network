import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginData } from "../../api/social-networkAPI";
import { loginUser, setFieldsErrors } from "../../redux/auth_reducer";
import { selectCaptchaURL, selectIsUserLoggedIn } from "../../redux/selectors/selectors";
import { AppStateType } from "../../redux/store";
import { ROUTES_PATHS } from "../../routes/Routes";
import { LoginForm } from "./LoginForm";
import s from "./LoginPage.module.css"

class LoginPage extends React.Component<LoginPropsType> {
    onSubmit(formData: LoginData) {
        const { loginUser } = this.props;
        loginUser(formData);
    }

    render() {
        // TODO
        if (this.props.isUserLoggedIn) return <Redirect to={ROUTES_PATHS.profile} />;

        return (
            <div className={s.container}>
                <h1 className={s.header}>Вход в аккаунт</h1>
                <LoginForm
                    onSubmit={this.onSubmit.bind(this)}
                    captcha={this.props.captcha}
                    fieldsErrors={this.props.fieldsErrors}
                    setFieldsErrors={this.props.setFieldsErrors}
                />
            </div>
        );
    }
}

//HOC
const mapStateToProps = (state: AppStateType): MapPropsType => ({
    isUserLoggedIn: selectIsUserLoggedIn(state),
    captcha: selectCaptchaURL(state),
    fieldsErrors: state.auth.fieldsErrors,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    loginUser,
    setFieldsErrors,
})(LoginPage);

//types
type MapPropsType = {
    isUserLoggedIn: boolean;
    captcha: string | null;
    fieldsErrors: null | string[];
};
type DispatchPropsType = {
    loginUser: (data: LoginData) => void;
    setFieldsErrors: (errors: null | string[]) => void;
};
export type LoginPropsType = MapPropsType & DispatchPropsType;
