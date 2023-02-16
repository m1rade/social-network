import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ProfileResponseType } from "../../api/social-networkAPI";
import { addPostMessage, fetchProfile, PostType, updatePostMessage } from "../../redux/profile_reducer";
import { AppStateType } from "../../redux/store";
import Preloader from "../common/Preloader";
import { Profile } from "./Profile";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        this.props.fetchProfile(this.props.match.params.userID);
    }

    render() {
        const { history, location, match, staticContext, fetchProfile, ...restProps } = this.props;
        
        return <>{this.props.isFetching ? <Preloader /> : <Profile {...restProps} />}</>;
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    userInfo: state.profile.userInfo,
    isFetching: state.profile.isFetching,
    newPostMessage: state.profile.newPostMessage,
    posts: state.profile.posts,
});

const WithURLProfileContainer = withRouter(ProfileContainer);

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPostMessage,
    updatePostMessage,
    fetchProfile,
})(WithURLProfileContainer);

//types
type MapStatePropsType = {
    userInfo: ProfileResponseType;
    posts: PostType[];
    isFetching: boolean;
    newPostMessage: string;
};

type MapDispatchPropsType = {
    fetchProfile: (userID: string) => void;
    addPostMessage: () => void;
    updatePostMessage: (newPostMessage: string) => void;
};

type PathParamsType = {
    userID: string;
};

export type ProfileOwnPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileOwnPropsType;
