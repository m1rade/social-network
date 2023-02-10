import React from "react";
import { UserType } from "../../../redux/search_reducer";
import getPageList from "../../../utils/getPageList";
import { Pagination } from "./Pagination/Pagination";
import { User } from "./User/User";

type UsersPropsType = {
    users: UserType[];
    totalCount: number;
    curPage: number;
    itemsPerPage: number;
    followUnfollowHandler: (id: number, value: boolean) => void;
    changePageHandler: (curPage: number) => void;
};

export const Users: React.FC<UsersPropsType> = (props) => {
    const mappedUsers = props.users.map((u) => {
        return (
            <User
                key={u.id}
                user={u}
                followUnfollowHandler={() => props.followUnfollowHandler(u.id, !u.followed)}
            />
        );
    });

    return (
        <div style={{ height: "100vh", overflow: "auto" }}>
            <span>Users</span>
            <br />
            <hr />
            <div>
                <Pagination
                    totalCount={props.totalCount}
                    curPage={props.curPage}
                    pageSize={props.itemsPerPage}
                    changeCurrentPage={props.changePageHandler}
                />
                {mappedUsers}
            </div>
        </div>
    );
};
