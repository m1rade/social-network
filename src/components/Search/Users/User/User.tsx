import React from "react";
import s from "./User.module.css";
import userImagePlaceholder from "../../../../assets/icons/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../../api/social-networkAPI";
import YellowButton from "../../../common/Buttons/YellowButton";

type UserPropsType = {
    user: UserType;
    followUnfollowHandler: () => void;
    followingInProgress: Array<number>;
};

export const User: React.FC<UserPropsType> = (props) => {
    return (
        <div className={s.container}>
            <div className={s.row}>
                <div className={s.column_1}>
                    <div className={s.avatar}>
                        <NavLink className={s.userNavLink} to={`profile/` + props.user.id}>
                            <img
                                src={props.user.photos.small ? props.user.photos.small : userImagePlaceholder}
                                alt="small-avatar"
                            />
                        </NavLink>
                    </div>
                    <div className={s.follow}>
                        <YellowButton
                            disabled={props.followingInProgress.some((id) => id === props.user.id)}
                            onClick={() => props.followUnfollowHandler()}>
                            {!props.user.followed ? "Follow" : "Unfollow"}
                        </YellowButton>
                    </div>
                </div>
                <div className={s.column_2}>
                    <div className={s.userFrame}>
                        <NavLink className={s.userNavLink} to={`profile/` + props.user.id}>
                            <span className={s.userName}>{props.user.name}</span>
                        </NavLink>
                        <span className={s.userStatus}>{props.user.status ? props.user.status : " "}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
