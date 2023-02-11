import React from "react";
import { ProfileResponseType } from "../../../redux/profile_reducer";
import s from "./ProfileInfo.module.css";

type ProfileInfoPropsType = {
    userInfo: ProfileResponseType;
};

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    return (
        <div className={s.container}>
            <div className={s.row_1}>
                <div className={s.pictureCol}>
                    <div className={s.avatar}>
                        <img src={props.userInfo.photos.large} alt="avatar" />
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
                    <span><a href={props.userInfo.contacts.mainLink}>Site</a></span>
                    <span><a href={props.userInfo.contacts.website}>WebSite</a></span>
                    <span><a href={props.userInfo.contacts.vk}>Vk</a></span>
                    <span><a href={props.userInfo.contacts.facebook}>Facebook</a></span>
                    <span><a href={props.userInfo.contacts.youtube}>Youtube</a></span>
                    <span><a href={props.userInfo.contacts.instagram}>Instagram</a></span>
                    <span><a href={props.userInfo.contacts.github}>Github</a></span>
                    <span><a href={props.userInfo.contacts.twitter}>Twitter</a></span>
                </div>
            </div>
        </div>
    );
};
