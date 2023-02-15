import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ProfileResponseType } from "../../api/social-networkAPI";
import {
    addPostMessage,
    fetchProfile,
    PostType,
    updatePostMessage
} from "../../redux/profile_reducer";
import { AppStateType } from "../../redux/store";
import Preloader from "../common/Preloader";
import { Profile } from "./Profile";

class ProfileContainer extends React.Component<ProfileContainerPropsType, AppStateType> {
    componentDidMount() {
        let userID = this.props.match.params.userID;
        this.props.fetchProfile(userID);
    }

    render() {
        return <>{this.props.isFetching ? <Preloader /> : <Profile {...this.props} />}</>;
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    userInfo: state.profile.userInfo,
    isFetching: state.profile.isFetching,
    newPostMessage: state.profile.newPostMessage,
    posts: state.profile.posts,
});

const WithURLProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    addPostMessage,
    updatePostMessage,
    fetchProfile,
})(WithURLProfileContainer);

//types
type mapStateToPropsType = {
    userInfo: ProfileResponseType;
    posts: PostType[];
    isFetching: boolean;
    newPostMessage: string;
};

type mapDispatchToPropsType = {
    fetchProfile: (userID: string) => void;
    addPostMessage: () => void;
    updatePostMessage: (newPostMessage: string) => void;
};

type PathParamsType = {
    userID: string;
};

type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileContainerOwnType;
export type ProfileContainerOwnType = mapStateToPropsType & mapDispatchToPropsType;
