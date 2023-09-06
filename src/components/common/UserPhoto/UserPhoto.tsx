import cn from "classnames";
import React from "react";
import userImagePlaceholder from "../../../assets/icons/user.png";
import s from "./UserPhoto.module.css";

type PropsType = {
    type: "small" | "large";
    srcPhoto: string | null;
    className?: string;
};

export const UserPhoto: React.FC<PropsType> = ({ type, srcPhoto, className }) => {
    const imgClass = cn(className, `${s.img}`, `${s[`${type}`]}`);
    // TODO style

    return <img className={imgClass} src={srcPhoto || userImagePlaceholder} alt={`${type}-avatar`} />;
};
