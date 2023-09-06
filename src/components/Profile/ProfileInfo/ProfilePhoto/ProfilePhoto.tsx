import React from "react";
import { Icon } from "../../../common/Icon/Icon";
import { EditPhoto } from "../../../common/Modals/EditPhoto";
import { UserPhoto } from "../../../common/UserPhoto/UserPhoto";
import s from "./ProfilePhoto.module.css";
import Preloader from "../../../common/Preloader";

type Props = {
    srcPhoto: string | null;
    isOwner: boolean;
    disabled?: boolean;
    changeProfilePhoto: (photo: File) => void;
};

type StateType = {
    isOpen: boolean;
};

export class ProfilePhoto extends React.Component<Props, StateType> {
    state: StateType = {
        isOpen: false,
    };

    openEditModal(value: boolean) {
        this.setState({
            isOpen: value,
        });
    }

    uploadPhoto(photo: File) {
        this.props.changeProfilePhoto(photo);
        this.openEditModal(false);
    }

    render() {
        return (
            <>
                <div className={s.container}>
                    {this.props.disabled ? (
                        <Preloader />
                    ) : (
                        <>
                            <UserPhoto type="large" srcPhoto={this.props.srcPhoto} />
                            {this.props.isOwner && (
                                <>
                                    <div className={s.editPhoto}>
                                        <button className={s.editIconBtn} onClick={() => this.openEditModal(true)}>
                                            <span className={s.editIconBtnInner}>
                                                <Icon name="edit" className={s.editIcon} viewBox="0 0 24 24" />
                                            </span>
                                        </button>
                                    </div>
                                    <EditPhoto
                                        header="Добавление новой фотографии"
                                        open={this.state.isOpen}
                                        onClose={() => this.openEditModal(false)}
                                        onFileSelected={this.uploadPhoto.bind(this)}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    }
}
