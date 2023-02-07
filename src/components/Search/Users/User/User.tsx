import React from "react";
import { UserType } from "../../../../redux/search_reducer";
import s from "./User.module.css";
import userImagePlaceholder from "../../../../assets/icons/user.png";

type UserPropsType = {
    user: UserType;
    followUnfollowHandler: () => void;
};

export class User extends React.Component<UserPropsType> {
    render() {
        return (
            <div className={s.container}>
                <div className={s.row}>
                    <div className={s.column_1}>
                        <div className={s.avatar}>
                            <img src={this.props.user.photos.small ? this.props.user.photos.small : userImagePlaceholder} alt="small-avatar" />
                        </div>
                        <div className={s.follow}>
                            <button onClick={() => this.props.followUnfollowHandler()}>
                                {!this.props.user.followed ? "Follow" : "Unfollow"}
                            </button>
                        </div>
                    </div>
                    <div className={s.column_2}>
                        <div className={s.userFrame}>
                            <span className={s.userName}>{this.props.user.name}</span>
                            <span className={s.userStatus}>
                                {this.props.user.status ? this.props.user.status : " "}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
