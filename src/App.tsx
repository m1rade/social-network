import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Messages } from "./components/Messages/Messages";
import { Music } from "./components/Music";
import { Navbar } from "./components/Navbar/Navbar";
import { News } from "./components/News";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { SearchPage } from "./components/Search/SearchPage";
import { Settings } from "./components/Settings";

const App = () => {
    return (
        <div className="app-wrapper">
            <Header />
            <Navbar />
            <div className="main">
                <Switch>
                    <Route exact path="/profile" render={() => <ProfileContainer />} />
                    <Route exact path="/messages" render={() => <Messages />} />
                    <Route exact path="/search" render={() => <SearchPage />} />
                    <Route exact path="/news" render={() => <News />} />
                    <Route exact path="/music" render={() => <Music />} />
                    <Route exact path="/settings" render={() => <Settings />} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
