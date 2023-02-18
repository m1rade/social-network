import React, { FocusEvent } from "react";
import YellowButton from "../../common/Buttons/YellowButton";
import s from "./ProfileStatus.module.css";

type StateType = {
    editMode: boolean;
};

type ProfileStatusPropsType = {
    status: string;
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {
    state: StateType = {
        editMode: false,
    };

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode,
        });
    };

    handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        event.currentTarget.select();
    };

    handleButtonClick = () => {};

    render() {
        return (
            <div className={s.ProfileStatus}>
                {!this.state.editMode ? (
                    <div onClick={this.toggleEditMode} className={s.statusText}>
                        {this.props.status}
                    </div>
                ) : (
                    <div className={s.statusBox}>
                        <input
                            value={this.props.status}
                            onBlur={this.toggleEditMode}
                            onFocus={this.handleFocus}
                            type="text"
                            autoFocus
                        />
                        <div className={s.saveStatus}>
                            <YellowButton onClick={this.handleButtonClick}>Save</YellowButton>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
