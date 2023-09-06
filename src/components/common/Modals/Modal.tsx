import React from "react";
import s from "./Modal.module.css";
import { Icon } from "../Icon/Icon";

type Props = {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    header: string;
};

export const Modal: React.FC<Props> = ({ open, onClose, children, header }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            {open && (
                <div className={s.box}>
                    <div className={s.backdrop} onMouseDown={handleClose}></div>
                    <div className={s.content}>
                        <div className={s.header}>
                            <h1 className={s.headerTitle}>{header}</h1>
                            <button className={s.closeIconBtn} onClick={handleClose}>
                                <Icon name="cross" viewBox="-5 -5 24 24" />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};
