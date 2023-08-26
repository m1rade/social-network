import React from "react";
import s from "./UserStatus.module.css";

type PropsType = {
    status: string;
};

export const UserStatus: React.FC<PropsType> = ({ status }) => {
    return <span className={s.userStatus}>{status}</span>;
};
