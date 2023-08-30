import React from "react";
import { connect } from "react-redux";
import { UserType } from "../../../api/social-networkAPI";
import { follow_UnfollowUserThunk } from "../../../redux/search_reducer";
import { selectFollowingInProgress, selectIsFetching, selectUsers } from "../../../redux/selectors/selectors";
import { AppStateType } from "../../../redux/store";
import Preloader from "../../common/Preloader";
import { Users } from "./Users";

class UsersContainer extends React.Component<UsersContainerPropsType> {
    followUnfollowHandler = (userID: number, followed: boolean) => {
        this.props.follow_UnfollowUserThunk(userID, followed);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? (
                    <Preloader />
                ) : (
                    <Users
                        users={this.props.users}
                        followUnfollowHandler={this.followUnfollowHandler}
                        followingInProgress={this.props.followingInProgress}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: selectUsers(state),
    isFetching: selectIsFetching(state),
    followingInProgress: selectFollowingInProgress(state),
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    follow_UnfollowUserThunk,
})(UsersContainer);

//types
type MapStatePropsType = {
    users: UserType[];
    isFetching: boolean;
    followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
    follow_UnfollowUserThunk: (id: number, followed: boolean) => void;
};

type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType;
