import React from "react";
import { connect } from "react-redux";
import { UserType } from "../../../api/social-networkAPI";
import { follow_UnfollowUserThunk, getUsersThunk } from "../../../redux/search_reducer";
import {
    selectCurPage,
    selectFollowingInProgress,
    selectIsFetching,
    selectItemsPerPage,
    selectTotalCount,
    selectUsers,
} from "../../../redux/selectors/selectors";
import { AppStateType } from "../../../redux/store";
import Preloader from "../../common/Preloader";
import { Users } from "./Users";

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        const { itemsPerPage, curPage } = this.props;
        this.props.getUsersThunk(itemsPerPage, curPage);
    }

    changePageHandler = (curPage: number) => {
        const { itemsPerPage } = this.props;
        this.props.getUsersThunk(itemsPerPage, curPage);
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
    users: selectUsers(state),
    totalCount: selectTotalCount(state),
    curPage: selectCurPage(state),
    itemsPerPage: selectItemsPerPage(state),
    isFetching: selectIsFetching(state),
    followingInProgress: selectFollowingInProgress(state),
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
