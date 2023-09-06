import React, { ChangeEvent, createRef } from "react";
import YellowButton from "../Buttons/YellowButton";
import s from "./EditPhoto.module.css";
import { Modal } from "./Modal";

type Props = {
    open: boolean;
    onClose: () => void;
    onFileSelected: (photo: File) => void;
    header: string;
};

type StateType = {
    photoFile: File | undefined;
    photoURL: string;
};

export class EditPhoto extends React.PureComponent<Props, StateType> {
    private inputRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.state = {
            photoFile: undefined,
            photoURL: "",
        };
        this.inputRef = createRef<HTMLInputElement>();

        this.handleSelectFile = this.handleSelectFile.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.onFileSelectedUpload = this.onFileSelectedUpload.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleButtonClick() {
        if (this.inputRef.current) this.inputRef.current.click();
    }

    setPhotoFile(value: File | undefined) {
        this.setState({
            photoFile: value,
        });
    }

    handleSelectFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            this.setPhotoFile(e.currentTarget.files[0]);
            this.setState({
                photoURL: URL.createObjectURL(e.currentTarget.files[0]),
            });
        }
    }

    onFileSelectedUpload() {
        if (this.state.photoFile) {
            this.props.onFileSelected(this.state.photoFile);
            this.handleCloseModal();
        }
    }

    handleCloseModal() {
        this.props.onClose();
        this.state.photoURL && URL.revokeObjectURL(this.state.photoURL);
        this.setState({
            photoURL: "",
        });
        this.setPhotoFile(undefined);
    }

    render() {
        const { open, header } = this.props;

        return (
            <Modal open={open} onClose={this.handleCloseModal} header={header}>
                <div className={s.content}>
                    <div className={s.desc}>Принимаются форматы: JPG, PNG</div>
                    <div className={s.form}>
                        <input
                            type="file"
                            accept="image/png,image/jpeg"
                            className={s.formInput}
                            ref={this.inputRef}
                            onChange={this.handleSelectFile}
                        />
                        {this.state.photoFile && (
                            <YellowButton onClick={this.onFileSelectedUpload}>Загрузить фото</YellowButton>
                        )}
                        <YellowButton onClick={this.handleButtonClick}>Выбрать файл</YellowButton>
                    </div>
                    {this.state.photoFile && (
                        <div className={s.preview}>
                            <img src={this.state.photoURL} alt="preview" />
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}
