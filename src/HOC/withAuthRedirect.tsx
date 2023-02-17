import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../redux/store";

type MapStatePropsType = {
    isUserLoggedIn: boolean;
};
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
});

function withAuthRedirect<P>(WrappedComponent: React.ComponentType<P>) {
    // create name for React Dev tools
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    // inner component
    const WithAuthRedirect: React.FC<MapStatePropsType> = ({isUserLoggedIn, ...restProps}) => {

        if (!isUserLoggedIn) return <Redirect to={"/login"} />;

        //@ts-ignore
        return <WrappedComponent {...restProps as P} />
    };

    WithAuthRedirect.displayName = `WithAuthRedirect(${displayName})`;

    return connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps)(WithAuthRedirect);
}

export default withAuthRedirect;
