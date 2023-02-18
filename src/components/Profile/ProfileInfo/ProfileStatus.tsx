import React, { ChangeEvent, FocusEvent } from "react";
import YellowButton from "../../common/Buttons/YellowButton";
import s from "./ProfileStatus.module.css";

type StateType = {
    editMode: boolean;
    status: string;
};

type ProfileStatusPropsType = {
    status: string;
    updateProfileStatus: (status: string) => void;
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {
    state: StateType = {
        editMode: false,
        status: this.props.status,
    };

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<StateType>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
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

    handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        e.currentTarget.select();
    };

    handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (!e.relatedTarget) {
            this.setState({
                status: this.props.status,
            });

            this.toggleEditMode(false);
        }
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            <div className={s.ProfileStatus}>
                {!this.state.editMode ? (
                    <div onClick={() => this.toggleEditMode(true)} className={s.statusText}>
                        {this.props.status || "Изменить статус"}
                    </div>
                ) : (
                    <div className={s.statusBox} onBlur={this.handleOnBlur} tabIndex={1}>
                        <input
                            value={this.state.status}
                            //onBlur={this.handleOnBlur}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange}
                            type="text"
                            autoFocus
                        />
                        <div className={s.saveStatus}>
                            <YellowButton onClick={this.saveStatusOnClick}>Save</YellowButton>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
