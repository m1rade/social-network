import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { LoginData } from "../../api/social-networkAPI";
import { loginUser } from "../../redux/auth_reducer";
import { AppStateType } from "../../redux/store";
import YellowButton from "../common/Buttons/YellowButton";

type LoginPropsType = dispatchPropsType & {};

const LoginPage: React.FC<LoginPropsType> = ({loginUser}) => {
    const onSubmit = (formData: any) => {
        loginUser(formData);
    };

    return (
        <div>
            <h1>LoginPage</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

const LoginForm: React.FC<any> = ({ handleSubmit }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field placeholder="Login" name="login" component={"input"} />
                </div>
                <div>
                    <Field placeholder="Password" name="password" component={"input"} />
                </div>
                <div>
                    <Field type={"checkbox"} name="rememberMe" component={"input"} /> Remember me
                </div>
                <div>
                    <YellowButton>Submit</YellowButton>
                </div>
            </form>
        </>
    );
};


//HOCs
const LoginReduxForm = reduxForm({
    form: "login",
})(LoginForm);

const mapStateToProps = (state: AppStateType) => ({
    userId: state.auth.data.id
});

export default connect<mapPropsType, dispatchPropsType, {}, AppStateType>(mapStateToProps, { loginUser })(LoginPage);


//types
type mapPropsType = {
    userId: number
}
type dispatchPropsType = {
    loginUser: (data: LoginData) => void;
};