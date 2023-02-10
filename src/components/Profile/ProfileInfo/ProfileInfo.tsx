import React from "react";
import style from "./ProfileInfo.module.css";

type ProfileInfoPropsType = {
    photo: string,
    name: string,
    about: string
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    return (
        <div>
            <img
                className={style.avatar}
                src={props.photo}
                alt="avatar"
            />
            <span>{props.name}</span>
            <div>{props.about}</div>
        </div>
    );
};
