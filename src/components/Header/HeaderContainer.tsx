import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { AuthStateType, setAuthUserData } from "../../redux/auth_reducer";
import { toggleIsFetching } from "../../redux/search_reducer";
import { AppStateType } from "../../redux/store";
import { Header } from "./Header";

class HeaderContainer extends React.Component<HeaderContainerPropsType, AppStateType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })
            .then((resp) => {
                
                if (resp.status === 200) {
                    if (resp.data.resultCode === 0) {
                        this.props.setAuthUserData(resp.data);
                    }
                    this.props.setAuthUserData(resp.data) // здесь нужно записать сообщение об ошибке
                }
            })
            .catch((err) => alert(err))
            .finally(() => {
                this.props.toggleIsFetching(false);
            });
    }

    render() {
        return <Header isAuth={this.props.isAuth} userLogin={this.props.login} />;
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
});

export default connect(mapStateToProps, {
    setAuthUserData,
    toggleIsFetching,
})(HeaderContainer);



//types 
type mapStateToPropsType = {
    isAuth: boolean
    login: string
};
type mapDispatchToPropsType = {
    setAuthUserData: (data: AuthStateType) => void;
    toggleIsFetching: (value: boolean) => void;
};

type HeaderContainerPropsType = mapStateToPropsType & mapDispatchToPropsType;
