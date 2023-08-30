import React from "react";
import { UserType } from "../../../api/social-networkAPI";
import { Pagination } from "../../common/Pagination/Pagination";
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

export const Users: React.FC<UsersPropsType> = ({
    users,
    totalCount,
    curPage,
    itemsPerPage,
    followUnfollowHandler,
    changePageHandler,
    followingInProgress,
}) => {
    const mappedUsers = users.map(u => {
        return (
            <User
                key={u.id}
                user={u}
                followingInProgress={followingInProgress}
                followUnfollowHandler={() => followUnfollowHandler(u.id, u.followed)}
            />
        );
    });

    return (
        <div style={{ height: "100vh", overflow: "auto" }}>
            <span>Users</span>
            <br />
            <hr />
            <Pagination
                totalCount={totalCount}
                curPage={curPage}
                pageSize={itemsPerPage}
                changeCurrentPage={changePageHandler}
            />
            {mappedUsers}
        </div>
    );
};
