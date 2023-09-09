import React from 'react';
import s from "./ProfileInfo.module.css";

type Props = {
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
}

export const ProfileInfo: React.FC<Props> = ({aboutMe, lookingForAJob, lookingForAJobDescription}) => {
  return (
      <div className={s.description}>
          <div className={s.aboutMe}>
              <span>Обо мне: </span>
              <span>{aboutMe}</span>
          </div>
          <div>
              <span>В поиске работы: </span>
              <span>{lookingForAJob ? "Да" : "Нет"}</span>
          </div>
          <div>
              <span>Описание: </span>
              <span>{lookingForAJobDescription}</span>
          </div>
      </div>
  );
}