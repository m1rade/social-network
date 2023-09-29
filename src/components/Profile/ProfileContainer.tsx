import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ProfileResponseType } from "../../api/social-networkAPI";
import {
    PostType,
    UpdateProfileType,
    addPostMessage,
    changeProfilePhoto,
    fetchProfile,
    getProfileStatus,
    toggleUpdateInProgress,
    updateProfileData,
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
import { MyPosts } from "./MyPosts/MyPosts";
import s from "./ProfileContainer.module.css";
import { Profile } from "./ProfileInfo/Profile";

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
        const {
            history,
            location,
            match,
            staticContext,
            fetchProfile,
            getProfileStatus,
            posts,
            addPostMessage,
            ...restProps
        } = this.props;

        return (
            <>
                {this.props.isFetching ? (
                    <Preloader />
                ) : (
                    <div className={s.profile}>
                        <Profile isOwner={!this.props.match.params.userID} {...restProps} />
                        <MyPosts posts={posts} photo={restProps.userInfo.photos.small} addNewPost={addPostMessage} />
                    </div>
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
    updateInProgress: state.profile.update.updateInProgress,
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        fetchProfile,
        getProfileStatus,
        updateProfileStatus,
        changeProfilePhoto,
        addPostMessage,
        updateProfileData,
        toggleUpdateInProgress,
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
    updateInProgress: UpdateProfileType;
};

type MapDispatchPropsType = {
    fetchProfile: (userID: string | number) => void;
    getProfileStatus: (userID: string | number) => void;
    updateProfileStatus: (status: string) => void;
    changeProfilePhoto: (photo: File) => void;
    addPostMessage: (newPostMessage: string) => void;
    updateProfileData: (formData: any) => void;
    toggleUpdateInProgress: (state: UpdateProfileType) => void;
};

type PathParamsType = {
    userID: string;
};

export type ProfileOwnPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileOwnPropsType;
