import React from "react";
import { EditStatus } from "../../../common/Modals/EditStatus";
import s from "./ProfileStatus.module.css";
import { UserStatus } from "./UserStatus/UserStatus";

type StateType = {
    editMode: boolean;
};

type ProfileStatusPropsType = {
    status: string;
    isOwner: boolean;
    updateProfileStatus: (status: string) => void;
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {
    state: StateType = {
        editMode: false,
    };

    updateProfileStatus(status: string) {
        this.props.updateProfileStatus(status);
    }

    toggleEditMode = (value: boolean) => {
        this.setState({
            editMode: value,
        });
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
                    <EditStatus
                        status={this.props.status}
                        onChange={() => this.toggleEditMode(false)}
                        onSave={this.updateProfileStatus.bind(this)}
                    />
                )}
            </div>
        );
    }
}
