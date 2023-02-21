import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

type HeaderPropsType = {
    isUserLoggedIn: boolean;
    userLogin: string;
    logoutUser: () => void;
};

export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src="https://www.seekpng.com/png/detail/58-588581_open-diseos-para-logos-png.png" alt="logo" />
            <div className={s.loginBlock}>
                {props.isUserLoggedIn ? (
                    <span>
                        User name: {props.userLogin} ---
                        <span className={s.logoutButton} onClick={props.logoutUser}>
                            Log out
                        </span>
                    </span>
                ) : (
                    <NavLink to={"/login"}>Login</NavLink>
                )}
            </div>
        </header>
    );
};
