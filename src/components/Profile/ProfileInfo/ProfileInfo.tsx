import React from "react";
import { ProfileResponseType } from "../../../api/social-networkAPI";
import s from "./ProfileInfo.module.css";
import { ProfilePhoto } from "./ProfilePhoto/ProfilePhoto";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";

type ProfileInfoPropsType = {
    userInfo: ProfileResponseType;
    userStatus: string;
    isOwner: boolean;
    updateInProgress: boolean;
    updateProfileStatus: (status: string) => void;
    changeProfilePhoto: (photo: File) => void;
};

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    userInfo,
    userStatus,
    updateProfileStatus,
    isOwner,
    changeProfilePhoto,
    updateInProgress
}) => {
    const userContacts = Object.keys(userInfo.contacts)
        .filter(c => userInfo.contacts[c] !== null)
        .map((c, i) => (
            <span key={i}>
                <a key={i} href={userInfo.contacts[c]} target="_blank" rel="noreferrer noopener">
                    {c}
                </a>
            </span>
        ));

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
                        <ProfileStatus status={userStatus} updateProfileStatus={updateProfileStatus} />
                    </div>
                    <div className={s.description}>
                        <div className={s.aboutMe}>
                            <span>Обо мне: </span>
                            <span>{userInfo.aboutMe}</span>
                        </div>
                        <div>
                            <span>В поиске работы: </span>
                            <span>{userInfo.lookingForAJob ? "Да" : "Нет"}</span>
                        </div>
                        <div>
                            <span>Описание: </span>
                            <span>{userInfo.lookingForAJobDescription}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.row_2}>
                <div className={s.contactsCol}>
                    <div>Contacts: </div>
                    {userContacts}
                </div>
            </div>
        </div>
    );
};
