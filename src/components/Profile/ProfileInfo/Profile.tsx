import React from "react";
import { Link } from "react-router-dom";
import { ROUTES_PATHS } from "../../../routes/Routes";
import YellowButton from "../../common/Buttons/YellowButton";
import { ProfileOwnPropsType } from "../ProfileContainer";
import { Contacts } from "./Contacts/Contacts";
import { ProfileInfo } from "./Info/ProfileInfo";
import s from "./Profile.module.css";
import { ProfilePhoto } from "./ProfilePhoto/ProfilePhoto";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";

type ProfileInfoPropsType = Omit<
    ProfileOwnPropsType,
    "fetchProfile" | "getProfileStatus" | "addPostMessage" | "posts"
> & {
    isOwner: boolean;
};

export const Profile: React.FC<ProfileInfoPropsType> = ({
    userInfo,
    userStatus,
    updateProfileStatus,
    isOwner,
    changeProfilePhoto,
    updateInProgress,
    updateProfileData,
    ...restProps
}) => {
    return (
        <div className={s.container}>
            <div className={s.row_1}>
                <ProfilePhoto
                    isOwner={isOwner}
                    srcPhoto={userInfo.photos.large}
                    changeProfilePhoto={changeProfilePhoto}
                    disabled={updateInProgress}
                />
                <div className={s.infoCol}>
                    <div className={s.personalInfo}>
                        <div className={s.fullName}>{userInfo.fullName}</div>
                        <ProfileStatus
                            status={userStatus}
                            isOwner={isOwner}
                            updateProfileStatus={updateProfileStatus}
                        />
                    </div>
                    <ProfileInfo
                        aboutMe={userInfo.aboutMe}
                        lookingForAJob={userInfo.lookingForAJob}
                        lookingForAJobDescription={userInfo.lookingForAJobDescription}
                    />
                    <Contacts contacts={userInfo.contacts} />
                </div>
            </div>
            <div className={s.row_2}>
                {isOwner && (
                    <div className={s.EditProfileBtn}>
                        <Link to={ROUTES_PATHS.edit}>
                            <YellowButton>Редактировать профиль</YellowButton>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
