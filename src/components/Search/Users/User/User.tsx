import React from "react";
import { UserType } from "../../../../redux/search_reducer";
import s from "./User.module.css";
import userImagePlaceholder from "../../../../assets/icons/user.png";

type UserPropsType = {
    user: UserType;
    followUnfollowHandler: () => void;
};

export const User: React.FC<UserPropsType> = (props) => {
    return (
        <div className={s.container}>
            <div className={s.row}>
                <div className={s.column_1}>
                    <div className={s.avatar}>
                        <img
                            src={
                                props.user.photos.small
                                    ? props.user.photos.small
                                    : userImagePlaceholder
                            }
                            alt="small-avatar"
                        />
                    </div>
                    <div className={s.follow}>
                        <button onClick={() => props.followUnfollowHandler()}>
                            {!props.user.followed ? "Follow" : "Unfollow"}
                        </button>
                    </div>
                </div>
                <div className={s.column_2}>
                    <div className={s.userFrame}>
                        <span className={s.userName}>{props.user.name}</span>
                        <span className={s.userStatus}>
                            {props.user.status ? props.user.status : " "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
