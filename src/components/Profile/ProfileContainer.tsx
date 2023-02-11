import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
    addPostMessage,
    PostType,
    ProfileResponseType,
    setUserInfo,
    updatePostMessage,
} from "../../redux/profile_reducer";
import { toggleIsFetching } from "../../redux/search_reducer";
import { AppStateType } from "../../redux/store";
import Preloader from "../common/Preloader";
import { Profile } from "./Profile";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        
        this.props.toggleIsFetching(true);
        console.log("Loading");

        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = "2";
        }

        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userID)
            .then((resp) => {
                this.props.setUserInfo(resp.data);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                this.props.toggleIsFetching(false);
            });
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
    setUserInfo,
    addPostMessage,
    updatePostMessage,
    toggleIsFetching,
})(WithURLProfileContainer);


//types
type mapStateToPropsType = {
    userInfo: ProfileResponseType;
    posts: PostType[];
    isFetching: boolean;
    newPostMessage: string;
};

type mapDispatchToPropsType = {
    setUserInfo: (userInfo: ProfileResponseType) => void;
    addPostMessage: () => void;
    updatePostMessage: (newPostMessage: string) => void;
    toggleIsFetching: (value: boolean) => void;
};

type PathParamsType = {
    userID: string;
};

type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileContainerOwnType;
export type ProfileContainerOwnType = mapStateToPropsType & mapDispatchToPropsType;
