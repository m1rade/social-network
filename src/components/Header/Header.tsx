import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import { ROUTES_PATHS } from "../../routes/Routes";

type HeaderPropsType = {
    isUserLoggedIn: boolean;
    userLogin: string;
    logoutUser: () => void;
};

export const Header: React.FC<HeaderPropsType> = ({ isUserLoggedIn, userLogin, logoutUser }) => {
    return (
        <header className={s.header}>
            <img src="https://www.seekpng.com/png/detail/58-588581_open-diseos-para-logos-png.png" alt="logo" />
            <div className={s.loginBlock}>
                {isUserLoggedIn ? (
                    <span>
                        User name: {userLogin} ---
                        <span className={s.logoutButton} onClick={logoutUser}>
                            Log out
                        </span>
                    </span>
                ) : (
                    <NavLink to={ROUTES_PATHS.login}>Login</NavLink>
                )}
            </div>
        </header>
    );
};
