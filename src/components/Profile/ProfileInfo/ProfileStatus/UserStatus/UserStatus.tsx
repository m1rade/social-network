import React from "react";
import { Icon } from "../../../../common/Icon/Icon";
import s from "./UserStatus.module.css";

type Props = {
    status: string;
    isOwner: boolean;
    onClick: () => void;
};

export const UserStatus: React.FC<Props> = ({ status, onClick, isOwner }) => {
    const handleOnClick = () => {
        if (isOwner) {
            onClick();
        }
    };

    return (
        <span onClick={handleOnClick} className={s.inner}>
            <span className={s.text}>{status || "Изменить статус"}</span>
            {isOwner && (
                <span className={s.editIconAfter}>
                    <Icon name="edit" viewBox="0 0 22 22" className={s.editIcon} />
                </span>
            )}
        </span>
    );
};
