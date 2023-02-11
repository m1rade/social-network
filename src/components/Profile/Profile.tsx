import React from "react";
import Preloader from "../common/Preloader";
import { MyPosts } from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import { ProfileContainerType } from "./ProfileContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export const Profile: React.FC<ProfileContainerType> = (props) => {

    if (!props.userInfo) {
        return <div><Preloader /></div>
    }

return (
        <div className={s.profile}>
            <ProfileInfo userInfo={{ ...props.userInfo }} />
            <MyPosts
                posts={props.posts}
                photo={props.userInfo.photos.small}
                newPostMessage={props.newPostMessage}
                addNewPost={props.addPostMessage}
                onPostChange={props.updatePostMessage}
            />
        </div>
    );
};
