import React from "react";
import userImagePlaceholder from "../../../assets/icons/user.png";
import s from "./UserPhoto.module.css";

type PropsType = {
    type: "small" | "large";
    srcPhoto: string | null;
};

export const UserPhoto: React.FC<PropsType> = ({ srcPhoto, type }) => {
    return (
        <div className={type === "small" ? `${s.smallAvatar}` : `${s.avatar}`}>
            <img src={srcPhoto || userImagePlaceholder} alt={type === "small" ? "small-avatar" : "avatar"} />
        </div>
    );
};
