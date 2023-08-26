import React from "react";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../../api/social-networkAPI";
import YellowButton from "../../../common/Buttons/YellowButton";
import { UserPhoto } from "../../../common/UserPhoto/UserPhoto";
import s from "./User.module.css";
import { UserStatus } from "./UserStatus/UserStatus";

type UserPropsType = {
    user: UserType;
    followUnfollowHandler: () => void;
    followingInProgress: Array<number>;
};

export const User: React.FC<UserPropsType> = ({ user, followUnfollowHandler, followingInProgress }) => {
    return (
        <div className={s.container}>
            <div className={s.row}>
                <div className={s.column_1}>
                    <div className={s.avatar}>
                        <NavLink className={s.userNavLink} to={`profile/` + user.id}>
                            <UserPhoto type="small" srcPhoto={user.photos.small} />
                        </NavLink>
                    </div>
                    <div className={s.follow}>
                        <YellowButton
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => followUnfollowHandler()}>
                            {!user.followed ? "Follow" : "Unfollow"}
                        </YellowButton>
                    </div>
                </div>
                <div className={s.column_2}>
                    <div className={s.userFrame}>
                        <NavLink className={s.userNavLink} to={`profile/` + user.id}>
                            <span className={s.userName}>{user.name}</span>
                        </NavLink>
                        <UserStatus status={user.status ? user.status : ""} />
                    </div>
                </div>
            </div>
        </div>
    );
};
