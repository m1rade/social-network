import React from "react";
import sprites from "../../../assets/icons/sprite.svg";

type Props = {
    name: string;
    viewBox: string;
    onClick?: () => void;
    className?: string;
};

export const Icon: React.FC<Props> = ({ name, className, onClick, viewBox }) => {
    return (
        <svg className={className} viewBox={viewBox} onClick={() => onClick && onClick()}>
            <use xlinkHref={`${sprites}#${name}`}></use>
        </svg>
    );
};
