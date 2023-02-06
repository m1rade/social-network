import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <nav className={style.nav_bar}>
            <div className={style.linkItem}>
                <NavLink activeClassName={style.active} to="/profile">Profile</NavLink>
            </div>
            <div className={style.linkItem}>
                <NavLink activeClassName={style.active} to="/messages">Messages</NavLink>
            </div>
            <div className={style.linkItem}>
                <NavLink activeClassName={style.active} to="/search">Search</NavLink>
            </div>
            <div className={style.linkItem}>
                <NavLink activeClassName={style.active} to="/news">News</NavLink>
            </div>
            <div className={style.linkItem}>
                <NavLink activeClassName={style.active} to="/music">Music</NavLink>
            </div>
            <div className={style.linkItem}>
                <NavLink activeClassName={style.active} to="/settings">Settings</NavLink>
            </div>
        </nav>
    );
};
