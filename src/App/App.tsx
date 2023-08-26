import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { compose } from "redux";
import HeaderContainer from "../components/Header/HeaderContainer";
import LoginPage from "../components/Login/LoginPage";
import MessagesContainer from "../components/Messages/Messages";
import { Music } from "../components/Music";
import { Navbar } from "../components/Navbar/Navbar";
import { News } from "../components/News";
import ProfileContainer from "../components/Profile/ProfileContainer";
import { SearchPage } from "../components/Search/SearchPage";
import { Settings } from "../components/Settings";
import Preloader from "../components/common/Preloader";
import { initializeApp } from "../redux/app_reducer";
import { selectIsInitialized } from "../redux/selectors/selectors";
import { AppStateType } from "../redux/store";
import "./App.css";

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        const {isInitialized} = this.props;

        if (!isInitialized) return <Preloader />;

        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="main">
                    <Switch>
                        <Route exact path={"/"} render={() => <ProfileContainer />} />
                        <Route exact path="/profile/:userID?" render={() => <ProfileContainer />} />
                        <Route exact path="/messages" render={() => <MessagesContainer />} />
                        <Route exact path="/search" render={() => <SearchPage />} />
                        <Route exact path="/news" render={() => <News />} />
                        <Route exact path="/music" render={() => <Music />} />
                        <Route exact path="/settings" render={() => <Settings />} />
                        <Route exact path="/login" render={() => <LoginPage />} />
                    </Switch>
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
