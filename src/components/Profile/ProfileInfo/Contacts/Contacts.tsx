import React, { useMemo } from "react";
import { ContactsDomainType } from "../../../../api/social-networkAPI";
import s from "./Contacts.module.css";

type Props = {
    contacts: ContactsDomainType;
};

export const Contacts: React.FC<Props> = ({ contacts }) => {
    const userContacts = useMemo(
        () =>
            Object.keys(contacts)
                .filter(c => {
                    if (contacts[c] === "" || contacts[c] === null) {
                        return false;
                    }
                    return true;
                })
                .map((c, i) => {
                    const formatLink = (link: string) => {
                        if (/https:\/\//i.test(link)) {
                            return `${link}`;
                        } else {
                            return `https://${link}`;
                        }
                    };

                    return (
                        <span key={i}>
                            {c}
                            {": "}
                            <a key={i} href={formatLink(contacts[c])} target="_blank" rel="noreferrer noopener">
                                {contacts[c]}
                            </a>
                        </span>
                    );
                }),
        [contacts]
    );

    return (
        <div className={s.container}>
            <div>Контакты: </div>
            {userContacts}
        </div>
    );
};
