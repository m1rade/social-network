import React from "react";
import { UserType } from "../../../../redux/search_reducer";
import s from "./User.module.css";
import userImagePlaceholder from "../../../../assets/icons/user.png";

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
                    <div className={s.avatar}>
                        <img src={user.photos.small ? user.photos.small : userImagePlaceholder} alt="small-avatar" />
                    </div>
                    <div className={s.follow}>
                        <button onClick={() => followUnfollowHandler()}>
                            {!user.followed ? "Follow" : "Unfollow"}
                        </button>
                    </div>
                </div>
                <div className={s.column_2}>
                    <div className={s.userFrame}>
                        <span className={s.userName}>{user.name}</span>
                        <span className={s.userStatus}>
                            {user.status ? user.status : " "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
