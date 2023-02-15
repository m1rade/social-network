import React from "react";
import { connect } from "react-redux";
import { checkUserAuthentication } from "../../redux/auth_reducer";
import { AppStateType } from "../../redux/store";
import { Header } from "./Header";

class HeaderContainer extends React.Component<HeaderContainerPropsType, AppStateType> {
    componentDidMount() {
        this.props.checkUserAuthentication();
    }

    render() {
        return <Header isUserLoggedIn={this.props.isUserLoggedIn} userLogin={this.props.login} />;
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
    login: state.auth.login,
});

export default connect(mapStateToProps, {
    checkUserAuthentication,
})(HeaderContainer);

//types
type mapStateToPropsType = {
    isUserLoggedIn: boolean;
    login: string;
};
type mapDispatchToPropsType = {
    checkUserAuthentication: () => void;
};

type HeaderContainerPropsType = mapStateToPropsType & mapDispatchToPropsType;
