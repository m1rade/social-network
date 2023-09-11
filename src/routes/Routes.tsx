import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { Music } from "../components/Music";
import { News } from "../components/News";
import { Settings } from "../components/Settings";
import Preloader from "../components/common/Preloader";
const ProfileContainer = lazy(() => import("../components/Profile/ProfileContainer"));
const Messages = lazy(() => import("../components/Messages/Messages"));
const SearchPage = lazy(() =>
    import("../components/Search/SearchPage").then(module => ({ default: module.SearchPage }))
);
const LoginPage = lazy(() => import("../components/Login/LoginPage"));
const EditProfile = lazy(() =>
    import("../components/Profile/EditProfile/EditProfile").then(module => ({ default: module.EditProfile }))
);

export const ROUTES_PATHS = {
    profile: "/profile",
    messages: "/messages",
    search: "/search",
    news: "/news",
    music: "/music",
    settings: "/settings",
    login: "/login",
    edit: "/edit",
};

export const Routes: React.FC<any> = () => {
    return (
        <Suspense fallback={<Preloader />}>
            <Switch>
                <Route exact path={"/"} render={() => <ProfileContainer />} />
                <Route exact path={ROUTES_PATHS.profile} render={() => <ProfileContainer />} />
                <Route exact path={ROUTES_PATHS.edit} render={() => <EditProfile />} />
                <Route exact path={ROUTES_PATHS.messages} render={() => <Messages />} />
                <Route exact path={ROUTES_PATHS.search} render={() => <SearchPage />} />
                <Route exact path={ROUTES_PATHS.news} render={() => <News />} />
                <Route exact path={ROUTES_PATHS.music} render={() => <Music />} />
                <Route exact path={ROUTES_PATHS.settings} render={() => <Settings />} />
                <Route exact path={ROUTES_PATHS.login} render={() => <LoginPage />} />
            </Switch>
        </Suspense>
    );
};
