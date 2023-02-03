import React from "react";
import style from "./ProfileInfo.module.css";
import {ProfileInfoContainerPropsType} from "../../../containers/ProfileInfoContainer";


export const ProfileInfo: React.FC<ProfileInfoContainerPropsType> = (props) => {

    return (
        <div>
            <img
                className={style.avatar}
                src={props.avatar}
                alt="avatar"
            />
            <span>{props.name}</span>
            <div>{props.description}</div>
        </div>
    );
};
