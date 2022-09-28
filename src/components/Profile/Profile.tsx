import React from "react";
import { MyPostsContainer } from "../../containers/MyPostsContainer";
import style from "./Profile.module.css";
import ProfileInfoContainer from "../../containers/ProfileInfoContainer";

export const Profile = () => {
    return (
        <div className={style.profile}>
            <ProfileInfoContainer />
            <MyPostsContainer />
        </div>
    );
};
