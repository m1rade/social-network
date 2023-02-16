import React from "react";
import { connect } from "react-redux";
import { checkUserAuthentication } from "../../redux/auth_reducer";
import { AppStateType } from "../../redux/store";
import { Header } from "./Header";

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.checkUserAuthentication();
    }

    render() {
        return <Header isUserLoggedIn={this.props.isUserLoggedIn} userLogin={this.props.login} />;
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
    login: state.auth.data.login,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    checkUserAuthentication,
})(HeaderContainer);

//types
type MapStatePropsType = {
    isUserLoggedIn: boolean;
    login: string;
};
type MapDispatchPropsType = {
    checkUserAuthentication: () => void;
};

type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType;
