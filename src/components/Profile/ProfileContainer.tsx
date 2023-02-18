import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ProfileResponseType } from "../../api/social-networkAPI";
// import withAuthRedirect from "../../HOC/withAuthRedirect";
import {
    addPostMessage,
    fetchProfile,
    getProfileStatus,
    PostType,
    updatePostMessage,
    updateProfileStatus,
} from "../../redux/profile_reducer";
import { AppStateType } from "../../redux/store";
import Preloader from "../common/Preloader";
import { Profile } from "./Profile";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userID = this.props.match.params.userID;
        this.props.fetchProfile(userID);
        this.props.getProfileStatus(userID);
    }

    render() {
        const { history, location, match, staticContext, fetchProfile, getProfileStatus, ...restProps } = this.props;

        return <>{this.props.isFetching ? <Preloader /> : <Profile {...restProps} />}</>;
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    userInfo: state.profile.userInfo,
    userStatus: state.profile.status,
    isFetching: state.profile.isFetching,
    newPostMessage: state.profile.newPostMessage,
    posts: state.profile.posts,
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addPostMessage,
        updatePostMessage,
        fetchProfile,
        getProfileStatus,
        updateProfileStatus,
    }),
    withRouter
    // withAuthRedirect,
)(ProfileContainer);

//types
type MapStatePropsType = {
    userInfo: ProfileResponseType;
    userStatus: string;
    posts: PostType[];
    isFetching: boolean;
    newPostMessage: string;
};

type MapDispatchPropsType = {
    fetchProfile: (userID: string) => void;
    getProfileStatus: (userID: string) => void;
    updateProfileStatus: (status: string) => void
    addPostMessage: () => void;
    updatePostMessage: (newPostMessage: string) => void;
};

type PathParamsType = {
    userID: string;
};

export type ProfileOwnPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileOwnPropsType;
