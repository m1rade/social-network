import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginData } from "../../api/social-networkAPI";
import { loginUser } from "../../redux/auth_reducer";
import { selectIsUserLoggedIn } from "../../redux/selectors/selectors";
import { AppStateType } from "../../redux/store";
import { ROUTES_PATHS } from "../../routes/Routes";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component<LoginPropsType> {
    onSubmit(formData: LoginData) {
        const {loginUser} = this.props;
        loginUser(formData);
    }

    render(): React.ReactNode {
        //TODO
        if (this.props.isUserLoggedIn) return <Redirect to={ROUTES_PATHS.profile} />;

        return (
            <div>
                <h1>Login</h1>
                <LoginForm onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

//HOC
const mapStateToProps = (state: AppStateType): MapPropsType => ({
    isUserLoggedIn: selectIsUserLoggedIn(state),
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { loginUser })(LoginPage);

//types
type MapPropsType = {
    isUserLoggedIn: boolean;
};
type DispatchPropsType = {
    loginUser: (data: LoginData) => void;
};
type LoginPropsType = MapPropsType & DispatchPropsType;
