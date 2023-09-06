import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ProfileResponseType } from "../../api/social-networkAPI";
import {
    PostType,
    addPostMessage,
    changeProfilePhoto,
    fetchProfile,
    getProfileStatus,
    updateProfileStatus,
} from "../../redux/profile_reducer";
import {
    selectIsFetching,
    selectIsUserLoggedIn,
    selectLoggedUserID,
    selectPosts,
    selectUserInfo,
    selectUserStatus,
} from "../../redux/selectors/selectors";
import { AppStateType } from "../../redux/store";
import { ROUTES_PATHS } from "../../routes/Routes";
import Preloader from "../common/Preloader";
import { Profile } from "./Profile";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    refreshProfile() {
        let userID: string | number | null = this.props.match.params.userID;

        if (!userID) {
            userID = this.props.loggedUserID;
            if (!userID && !this.props.isUserLoggedIn) {
                this.props.history.push(ROUTES_PATHS.login);
            }
        }

        if (userID) {
            this.props.fetchProfile(userID);
            this.props.getProfileStatus(userID);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>) {
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.refreshProfile();
        }
    }

    render() {
        const { history, location, match, staticContext, fetchProfile, getProfileStatus, ...restProps } = this.props;

        return (
            <>
                {this.props.isFetching ? (
                    <Preloader />
                ) : (
                    <Profile isOwner={!this.props.match.params.userID} {...restProps} />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    userInfo: selectUserInfo(state),
    userStatus: selectUserStatus(state),
    isFetching: selectIsFetching(state),
    posts: selectPosts(state),
    loggedUserID: selectLoggedUserID(state),
    isUserLoggedIn: selectIsUserLoggedIn(state),
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        fetchProfile,
        getProfileStatus,
        updateProfileStatus,
        changeProfilePhoto,
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
    changeProfilePhoto: (photo: File) => void;
    addPostMessage: (newPostMessage: string) => void;
};

type PathParamsType = {
    userID: string;
};

export type ProfileOwnPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileOwnPropsType;
