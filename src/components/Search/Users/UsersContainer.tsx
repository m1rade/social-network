import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    follow_unfollowAC,
    SearchActionType,
    setCurrentPageAC,
    setTotalCountAC,
    setUsersAC,
    toggleIsFetchingAC,
    UserType
} from "../../../redux/search_reducer";
import { AppStateType } from "../../../redux/store";
import Preloader from "../../common/Preloader";

import { Users } from "./Users";

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.itemsPerPage}&page=${this.props.curPage}`
            )
            .then((resp) => {
                this.props.setUsers(resp.data.items);
                this.props.setTotalCount(resp.data.totalCount);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                this.props.toggleIsFetching(false);
            })
    }

    changePageHandler = (curPage: number) => {
        this.props.setCurrentPage(curPage);

        this.props.toggleIsFetching(true);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.itemsPerPage}&page=${curPage}`
            )
            .then((resp) => {
                this.props.setUsers(resp.data.items);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                this.props.toggleIsFetching(false);
            })
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
                        followUnfollowHandler={this.props.followUnfollowHandler}
                        changePageHandler={this.changePageHandler}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.search.items,
    totalCount: state.search.totalCount,
    curPage: state.search.curPage,
    itemsPerPage: state.search.itemsPerPage,
    isFetching: state.search.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActionType>): mapDispatchToPropsType => ({
    setUsers: (items: UserType[]) => dispatch(setUsersAC(items)),
    followUnfollowHandler: (id: number, value: boolean) => dispatch(follow_unfollowAC(id, value)),
    setCurrentPage: (page: number) => dispatch(setCurrentPageAC(page)),
    setTotalCount: (totalCount: number) => dispatch(setTotalCountAC(totalCount)),
    toggleIsFetching: (value: boolean) => dispatch(toggleIsFetchingAC(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

//types
type mapStateToPropsType = {
    users: UserType[];
    totalCount: number;
    curPage: number;
    itemsPerPage: number;
    isFetching: boolean;
};

type mapDispatchToPropsType = {
    setUsers: (items: UserType[]) => void;
    followUnfollowHandler: (id: number, value: boolean) => void;
    setCurrentPage: (page: number) => void;
    setTotalCount: (totalCount: number) => void;
    toggleIsFetching: (value: boolean) => void;
};

export type UsersContainerPropsType = mapStateToPropsType & mapDispatchToPropsType;
