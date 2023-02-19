import React from 'react';
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/LoginPage';
import MessagesContainer from './components/Messages/Messages';
import { Music } from "./components/Music";
import { Navbar } from "./components/Navbar/Navbar";
import { News } from "./components/News";
import ProfileContainer from "./components/Profile/ProfileContainer";
import SearchPageContainer from "./components/Search/SearchPage";
import { Settings } from "./components/Settings";

const App: React.FC<any> = () => {
    return (
        <div className="app-wrapper">
            <HeaderContainer />
            <Navbar />
            <div className="main">
                <Switch>
                    <Route exact path={"/"} render={() => <ProfileContainer />} />
                    <Route exact path="/profile/:userID?" render={() => <ProfileContainer />} />
                    <Route exact path="/messages" render={() => <MessagesContainer />} />
                    <Route exact path="/search" render={() => <SearchPageContainer />} />
                    <Route exact path="/news" render={() => <News />} />
                    <Route exact path="/music" render={() => <Music />} />
                    <Route exact path="/settings" render={() => <Settings />} />
                    <Route exact path="/login" render={() => <LoginPage />} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
