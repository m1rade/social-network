import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./YellowButton.module.css";
import cn from "classnames"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type YellowButtonPropsType = DefaultButtonPropsType & {};

const YellowButton: React.FC<YellowButtonPropsType> = ({ className, disabled, ...restProps }) => {
    const finalClassName = cn(`${s.yellowButton}`, className);

    return <button disabled={disabled} className={finalClassName} {...restProps} />;
};

export default YellowButton;
