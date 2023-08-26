import React from "react";
import { MyPosts } from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import { ProfileOwnPropsType } from "./ProfileContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

type ProfileSuperPropsType = Omit<ProfileOwnPropsType, "fetchProfile" | "getProfileStatus">;

export const Profile: React.FC<ProfileSuperPropsType> = ({
    userInfo,
    userStatus,
    updateProfileStatus,
    posts,
    addPostMessage,
}) => {
    return (
        <div className={s.profile}>
            <ProfileInfo userInfo={userInfo} userStatus={userStatus} updateProfileStatus={updateProfileStatus} />
            <MyPosts posts={posts} photo={userInfo.photos.small} addNewPost={addPostMessage} />
        </div>
    );
};
