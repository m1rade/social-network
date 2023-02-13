import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import {
    follow_unfollowHandler,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    UserType,
} from "../../../redux/search_reducer";
import { AppStateType } from "../../../redux/store";
import Preloader from "../../common/Preloader";
import { Users } from "./Users";

const API_KEYS = "d85e69be-8131-4e67-a4be-aab397617799";

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.itemsPerPage}&page=${this.props.curPage}`,
                { withCredentials: true }
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
            });
    }

    changePageHandler = (curPage: number) => {
        this.props.setCurrentPage(curPage);

        this.props.toggleIsFetching(true);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.itemsPerPage}&page=${curPage}`,
                { withCredentials: true }
            )
            .then((resp) => {
                this.props.setUsers(resp.data.items);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                this.props.toggleIsFetching(false);
            });
    };

    followUnfollowHandler = (userID: number, followed: boolean) => {
        this.props.toggleIsFetching(true);
        debugger
        if (!followed) {
            axios
                .post(
                    `https://social-network.samuraijs.com/api/1.0/follow/${userID}`,
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            "API-KEYS": API_KEYS
                        },
                    }
                )
                .then((resp) => {
                    if (resp.data.resultCode === 0) {
                        this.props.setUsers(resp.data.items);
                        this.props.follow_unfollowHandler(userID, !followed);
                    }
                })
                .catch((err) => {
                    alert(err);
                })
                .finally(() => {
                    this.props.toggleIsFetching(false);
                });
        } else {
            axios
                .delete(`https://social-network.samuraijs.com/api/1.0/follow/${userID}`, {
                    withCredentials: true,
                    headers: {
                        "API-KEYS": API_KEYS
                    },
                })
                .then((resp) => {
                    if (resp.data.resultCode === 0) {
                        this.props.setUsers(resp.data.items);
                        this.props.follow_unfollowHandler(userID, !followed);
                    }
                })
                .catch((err) => {
                    alert(err);
                })
                .finally(() => {
                    this.props.toggleIsFetching(false);
                });
        }
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

export default connect(mapStateToProps, {
    setUsers,
    follow_unfollowHandler,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching,
})(UsersContainer);

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
    follow_unfollowHandler: (id: number, followed: boolean) => void;
    setCurrentPage: (page: number) => void;
    setTotalCount: (totalCount: number) => void;
    toggleIsFetching: (value: boolean) => void;
};

type UsersContainerPropsType = mapStateToPropsType & mapDispatchToPropsType;
