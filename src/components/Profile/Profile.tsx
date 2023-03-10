import React from "react";
import { MyPosts } from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import { ProfileOwnPropsType } from "./ProfileContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

type ProfileSuperPropsType = Omit<ProfileOwnPropsType, "fetchProfile" | "getProfileStatus">;

export const Profile: React.FC<ProfileSuperPropsType> = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo userInfo={props.userInfo} userStatus={props.userStatus} updateProfileStatus={props.updateProfileStatus}/>
            <MyPosts
                posts={props.posts}
                photo={props.userInfo.photos.small}
                addNewPost={props.addPostMessage}
            />
        </div>
    );
};
