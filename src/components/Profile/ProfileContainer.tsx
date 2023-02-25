import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ProfileResponseType } from "../../api/social-networkAPI";
import {
    addPostMessage,
    fetchProfile,
    getProfileStatus,
    PostType,
    updateProfileStatus,
} from "../../redux/profile_reducer";
import { AppStateType } from "../../redux/store";
import Preloader from "../common/Preloader";
import { Profile } from "./Profile";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userID: string | number | null = this.props.match.params.userID;

        if (!userID) {
            userID = this.props.loggedUserID;
            if (!userID) {
                this.props.history.push("/login");
            }
        }
        
        if (this.props.isUserLoggedIn && userID) {
            this.props.fetchProfile(userID);
            this.props.getProfileStatus(userID);
        }
    }

    render() {
        const { history, location, match, staticContext, fetchProfile, getProfileStatus, ...restProps } = this.props;

        return <>{this.props.isFetching || !this.props.isUserLoggedIn ? <Preloader /> : <Profile {...restProps} />}</>;
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    userInfo: state.profile.userInfo,
    userStatus: state.profile.status,
    isFetching: state.profile.isFetching,
    posts: state.profile.posts,
    loggedUserID: state.auth.data.id,
    isUserLoggedIn: state.auth.isUserLoggedIn,
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        fetchProfile,
        getProfileStatus,
        updateProfileStatus,
        addPostMessage,
    }),
    withRouter
)(ProfileContainer);

//types
type MapStatePropsType = {
    userInfo: ProfileResponseType;
    userStatus: string;
    posts: PostType[];
    isFetching: boolean;
    loggedUserID: number | null;
    isUserLoggedIn: boolean;
};

type MapDispatchPropsType = {
    fetchProfile: (userID: string | number) => void;
    getProfileStatus: (userID: string | number) => void;
    updateProfileStatus: (status: string) => void;
    addPostMessage: (newPostMessage: string) => void;
};

type PathParamsType = {
    userID: string;
};

export type ProfileOwnPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileOwnPropsType;
