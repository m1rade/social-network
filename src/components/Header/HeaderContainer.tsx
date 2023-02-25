import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/auth_reducer";
import { AppStateType } from "../../redux/store";
import { Header } from "./Header";

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <Header
                isUserLoggedIn={this.props.isUserLoggedIn}
                userLogin={this.props.login || ""}
                logoutUser={this.props.logoutUser}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
    login: state.auth.data.login,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    logoutUser,
})(HeaderContainer);

//types
type MapStatePropsType = {
    isUserLoggedIn: boolean;
    login: string | null;
};
type MapDispatchPropsType = {
    logoutUser: () => void;
};

type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType;
