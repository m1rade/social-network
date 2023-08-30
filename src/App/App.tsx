import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import HeaderContainer from "../components/Header/HeaderContainer";
import { Navbar } from "../components/Navbar/Navbar";
import Preloader from "../components/common/Preloader";
import { initializeApp } from "../redux/app_reducer";
import { selectIsInitialized } from "../redux/selectors/selectors";
import { AppStateType } from "../redux/store";
import { Routes } from "../routes/Routes";
import s from  "./App.module.css";

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        const { isInitialized } = this.props;

        if (!isInitialized) return <Preloader />;

        return (
            <div className={s.appWrapper}>
                <HeaderContainer />
                <Navbar />
                <div className={s.main}>
                    <Routes />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isInitialized: selectIsInitialized(state),
});

export default compose<React.ComponentType>(
    withRouter,
    connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { initializeApp })
)(App);

//types
type DispatchPropsType = {
    initializeApp: () => void;
};

type MapPropsType = {
    isInitialized: boolean;
};

type AppPropsType = MapPropsType & DispatchPropsType;
