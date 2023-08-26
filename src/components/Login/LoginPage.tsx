import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginData } from "../../api/social-networkAPI";
import { loginUser } from "../../redux/auth_reducer";
import { selectIsUserLoggedIn } from "../../redux/selectors/selectors";
import { AppStateType } from "../../redux/store";
import LoginForm from "./LoginForm";

const LoginPage: React.FC<LoginPropsType> = ({ loginUser, isUserLoggedIn }) => {
    const onSubmit = (formData: LoginData) => {
        loginUser(formData);
    };

    if (isUserLoggedIn) return <Redirect to="/profile" />;

    return (
        <div>
            <h1>LoginPage</h1>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

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
