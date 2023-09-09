import React from 'react';
import { ContactsDomainType } from '../../../../api/social-networkAPI';
import s from "./Contacts.module.css";

type Props = {
    contacts: ContactsDomainType;
};

export const Contacts: React.FC<Props> = ({contacts}) => {
const userContacts = Object.keys(contacts)
    .filter(c => contacts[c] !== null)
    .map((c, i) => (
        <span key={i}>
            <a key={i} href={contacts[c]} target="_blank" rel="noreferrer noopener">
                {c}
            </a>
        </span>
    ));

  return (
      <div className={s.container}>
          <div>Контакты: </div>
          {userContacts}
      </div>
  );
}