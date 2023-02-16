import React from "react";
import { UserType } from "../../../api/social-networkAPI";
import { Pagination } from "./Pagination/Pagination";
import { User } from "./User/User";

type UsersPropsType = {
    users: UserType[];
    totalCount: number;
    curPage: number;
    itemsPerPage: number;
    followUnfollowHandler: (id: number, value: boolean) => void;
    changePageHandler: (curPage: number) => void;
    followingInProgress: Array<number>;
};

export const Users: React.FC<UsersPropsType> = (props) => {
    const mappedUsers = props.users.map((u) => {
        return (
            <User
                key={u.id}
                user={u}
                followingInProgress={props.followingInProgress}
                followUnfollowHandler={() => props.followUnfollowHandler(u.id, u.followed)}
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
