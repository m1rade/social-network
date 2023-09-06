import React from "react";
import { MyPosts } from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import { ProfileOwnPropsType } from "./ProfileContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

type ProfileSuperPropsType = Omit<ProfileOwnPropsType, "fetchProfile" | "getProfileStatus"> & {
    isOwner: boolean;
};

export const Profile: React.FC<ProfileSuperPropsType> = ({
    userInfo,
    userStatus,
    updateProfileStatus,
    posts,
    isOwner,
    changeProfilePhoto,
    addPostMessage,
    updateInProgress,
    ...restProps
}) => {
    return (
        <div className={s.profile}>
            <ProfileInfo
                isOwner={isOwner}
                userInfo={userInfo}
                userStatus={userStatus}
                updateInProgress={updateInProgress}
                updateProfileStatus={updateProfileStatus}
                changeProfilePhoto={changeProfilePhoto}
            />
            <MyPosts posts={posts} photo={userInfo.photos.small} addNewPost={addPostMessage} />
        </div>
    );
};
