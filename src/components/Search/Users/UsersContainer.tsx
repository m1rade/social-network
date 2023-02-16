import React from "react";
import { connect } from "react-redux";
import { UserType } from "../../../api/social-networkAPI";
import { follow_UnfollowUserThunk, getUsersThunk } from "../../../redux/search_reducer";
import { AppStateType } from "../../../redux/store";
import Preloader from "../../common/Preloader";
import { Users } from "./Users";

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        this.props.getUsersThunk(this.props.itemsPerPage, this.props.curPage);
    }

    changePageHandler = (curPage: number) => {
        this.props.getUsersThunk(this.props.itemsPerPage, curPage);
    };

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
                        totalCount={this.props.totalCount}
                        curPage={this.props.curPage}
                        itemsPerPage={this.props.itemsPerPage}
                        followUnfollowHandler={this.followUnfollowHandler}
                        changePageHandler={this.changePageHandler}
                        followingInProgress={this.props.followingInProgress}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: state.search.items,
    totalCount: state.search.totalCount,
    curPage: state.search.curPage,
    itemsPerPage: state.search.itemsPerPage,
    isFetching: state.search.isFetching,
    followingInProgress: state.search.followingInProgress,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getUsersThunk,
    follow_UnfollowUserThunk,
})(UsersContainer);

//types
type MapStatePropsType = {
    users: UserType[];
    totalCount: number;
    curPage: number;
    itemsPerPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
    getUsersThunk: (itemsPerPage: number, curPage: number) => void;
    follow_UnfollowUserThunk: (id: number, followed: boolean) => void;
};

type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType;
