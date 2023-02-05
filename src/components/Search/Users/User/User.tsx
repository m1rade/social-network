import React from "react";
import { UserType } from "../../../../redux/search_reducer";
import s from "./User.module.css";

type UserPropsType = {
    user: UserType;
    followUnfollowHandler: () => void;
};

export const User: React.FC<UserPropsType> = ({
    user,
    followUnfollowHandler,
}) => {
    return (
        <div className={s.container}>
            <div className={s.row}>
                <div className={s.column_1}>
                    <img
                        className={s.avatar}
                        src={user.photos.small}
                        alt="small-avatar"
                    />
                    <button
                        className={s.follow}
                        onClick={() => followUnfollowHandler}>
                        Follow
                    </button>
                </div>
                <div className={s.column_2}>
                    <div className={s.userFrame}>
                        <div className={s.userName}>{user.name}</div>
                        <div className={s.userStatus}>
                            {user.status ? user.status : " "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
