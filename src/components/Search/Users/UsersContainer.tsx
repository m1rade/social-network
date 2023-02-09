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
    UserType,
} from "../../../redux/search_reducer";
import { AppStateType } from "../../../redux/store";
import { User } from "./User/User";
import s from "./Users.module.css";

export class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
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
            });
    }

    countPages = () => {
        const totalPages = Math.ceil(this.props.totalCount / this.props.itemsPerPage);
        let pagesArr = [];
        for (let i = 1; i <= totalPages; i++) {
            pagesArr.push(i);
        }
        return pagesArr;
    };

    changePageHandler = (curPage: number) => {
        this.props.setCurrentPage(curPage);

        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.itemsPerPage}&page=${curPage}`
            )
            .then((resp) => {
                this.props.setUsers(resp.data.items);
            })
            .catch((err) => {
                alert(err);
            });
    };

    render() {
        const mappedUsers = this.props.users.map((u) => {
            return (
                <User
                    key={u.id}
                    user={u}
                    followUnfollowHandler={() => this.props.followUnfollowHandler(u.id, !u.followed)}
                />
            );
        });

        const mappedPages = this.countPages().map((p) => {
            const spanPageClass = this.props.curPage === p ? `${s.currentPage} ${s.page}` : s.page;

            return (
                <span key={p} className={spanPageClass} onClick={() => this.changePageHandler(p)}>
                    {p}{" "}
                </span>
            );
        });

        return (
            <div style={{ height: "100vh", overflow: "auto" }}>
                <span>Users</span>
                <br />
                <hr />
                <div>
                    <span>Pages:</span>
                    <br />
                    {mappedPages}
                    {mappedUsers}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.search.items,
    totalCount: state.search.totalCount,
    curPage: state.search.curPage,
    itemsPerPage: state.search.itemsPerPage,
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActionType>): mapDispatchToPropsType => ({
    setUsers: (items: UserType[]) => dispatch(setUsersAC(items)),
    followUnfollowHandler: (id: number, value: boolean) => dispatch(follow_unfollowAC(id, value)),
    setCurrentPage: (page: number) => dispatch(setCurrentPageAC(page)),
    setTotalCount: (totalCount: number) => dispatch(setTotalCountAC(totalCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

//types
type mapStateToPropsType = {
    users: UserType[];
    totalCount: number;
    curPage: number;
    itemsPerPage: number;
};

type mapDispatchToPropsType = {
    setUsers: (items: UserType[]) => void;
    followUnfollowHandler: (id: number, value: boolean) => void;
    setCurrentPage: (page: number) => void;
    setTotalCount: (totalCount: number) => void
};

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;
