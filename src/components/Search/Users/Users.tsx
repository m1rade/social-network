import React from "react";
import { UserType } from "../../../api/social-networkAPI";
import { User } from "./User/User";

type UsersPropsType = {
    users: UserType[];
    followUnfollowHandler: (id: number, value: boolean) => void;
    followingInProgress: Array<number>;
};

export const Users: React.FC<UsersPropsType> = ({ users, followUnfollowHandler, followingInProgress }) => {
    return (
        <>
            {users.map(u => {
                return (
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        followUnfollowHandler={() => followUnfollowHandler(u.id, u.followed)}
                    />
                );
            })}
        </>
    );
};
