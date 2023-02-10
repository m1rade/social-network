import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { addPostMessage, ProfileDomainType, setUserInfo, updatePostMessage } from "../../redux/profile_reducer";
import { toggleIsFetching } from "../../redux/search_reducer";
import { AppStateType } from "../../redux/store";
import Preloader from "../common/Preloader";
import { Profile } from "./Profile";

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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
    userInfo: state.profile,
    isFetching: state.profile.isFetching,
});

export default connect(mapStateToProps, {
    setUserInfo,
    addPostMessage,
    updatePostMessage,
    toggleIsFetching,
})(ProfileContainer);

//types
type mapStateToPropsType = {
    userInfo: ProfileDomainType;
    isFetching: boolean;
};

type mapDispatchToPropsType = {
    setUserInfo: (userInfo: ProfileDomainType) => void;
    addPostMessage: () => void;
    updatePostMessage: (newPostMessage: string) => void;
    toggleIsFetching: (value: boolean) => void;
};

export type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType;
