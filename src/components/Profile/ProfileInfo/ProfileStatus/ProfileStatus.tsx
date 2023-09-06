import React, { ChangeEvent, FocusEvent } from "react";
import YellowButton from "../../../common/Buttons/YellowButton";
import s from "./ProfileStatus.module.css";
import { UserStatus } from "./UserStatus/UserStatus";

type StateType = {
    editMode: boolean;
    status: string;
};

type ProfileStatusPropsType = {
    status: string;
    isOwner: boolean;
    updateProfileStatus: (status: string) => void;
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {
    state: StateType = {
        editMode: false,
        status: this.props.status,
    };

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<StateType>) {
        const { status } = this.props;
        if (prevProps.status !== status) {
            this.setState({
                status: status,
            });
        }
    }

    updateProfileStatus() {
        this.props.updateProfileStatus(this.state.status);
    }

    toggleEditMode = (value: boolean) => {
        this.setState({
            editMode: value,
        });
    };

    handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        e.currentTarget.select();
    };

    handleOnBlur = (e: FocusEvent<HTMLDivElement>) => {
        const { status } = this.props;
        if (!e.relatedTarget) {
            this.setState({
                status: status,
            });

            this.toggleEditMode(false);
        }
    };

    handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    saveStatusOnClick = () => {
        this.toggleEditMode(false);
        this.updateProfileStatus();
    };

    render() {
        return (
            <div className={s.container}>
                {!this.state.editMode ? (
                    <UserStatus
                        status={this.props.status}
                        isOwner={this.props.isOwner}
                        onClick={() => this.toggleEditMode(true)}
                    />
                ) : (
                    <div className={s.modalContainer} onBlur={this.handleOnBlur} tabIndex={1}>
                        <textarea
                            value={this.state.status}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange}
                            className={s.editInput}
                            autoFocus
                        />
                        <div className={s.saveStatus}>
                            <YellowButton onClick={this.saveStatusOnClick}>Сохранить</YellowButton>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
