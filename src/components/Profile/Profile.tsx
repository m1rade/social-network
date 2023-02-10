import React from "react";
import Preloader from "../common/Preloader";
import { MyPosts } from "./MyPosts/MyPosts";
import style from "./Profile.module.css";
import { ProfileContainerType } from "./ProfileContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export const Profile: React.FC<ProfileContainerType> = (props) => {

    if (!props.userInfo) {
        return <div><Preloader /></div>
    }

    return (
        <div className={style.profile}>
            <ProfileInfo
                name={props.userInfo.fullName}
                photo={props.userInfo.photos.small}
                about={props.userInfo.aboutMe}
            />
            <MyPosts
                posts={props.userInfo.posts}
                photo={props.userInfo.photos.small}
                newPostMessage={props.userInfo.newPostMessage}
                addNewPost={props.addPostMessage}
                onPostChange={props.updatePostMessage}
            />
        </div>
    );
};
