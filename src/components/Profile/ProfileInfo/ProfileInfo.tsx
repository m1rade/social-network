import React from "react";
import { ProfileResponseType } from "../../../redux/profile_reducer";
import s from "./ProfileInfo.module.css";
import userImagePlaceholder from "./../../../assets/icons/user.png";

type ProfileInfoPropsType = {
    userInfo: ProfileResponseType;
};

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    const userContacts = Object.keys(props.userInfo.contacts)
        .filter((c) => props.userInfo.contacts[c] !== null)
        .map((c, i) => (
            <span key={i}>
                <a key={i} href={props.userInfo.contacts[c]} target="_blank" rel="noreferrer noopener">
                    {c}
                </a>
            </span>
        ));

    return (
        <div className={s.container}>
            <div className={s.row_1}>
                <div className={s.pictureCol}>
                    <div className={s.avatar}>
                        <img
                            src={props.userInfo.photos.large ? props.userInfo.photos.large : userImagePlaceholder}
                            alt="avatar"
                        />
                    </div>
                </div>
                <div className={s.infoCol}>
                    <div className={s.personalInfo}>
                        <div className={s.fullName}>{props.userInfo.fullName}</div>
                        <div className={s.aboutMe}>{props.userInfo.aboutMe}</div>
                    </div>
                    <div className={s.jobSeeking}>
                        <span>В поиске работы: </span>
                        <span>{props.userInfo.lookingForAJob ? "Да" : "Нет"}</span>
                        <div>
                            <span>Описание: </span>
                            <span>{props.userInfo.lookingForAJobDescription}</span>
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
