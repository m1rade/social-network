import React from "react";
import { connect } from "react-redux";
import { ProfileInfo } from "../components/Profile/ProfileInfo/ProfileInfo";
import { AppStateType } from "../redux/store";

type ProfileInfoContainerPropsType = {
    name: string;
    description: string;
    avatar: string;
};

export const ProfileInfoContainer: React.FC<ProfileInfoContainerPropsType> = (props) => {
    return <ProfileInfo name={props.name} description={props.description} avatar={props.avatar} />
};

const mapStateToProps = (state: AppStateType): ProfileInfoContainerPropsType => ({
    name: state.profile.name,
    description: state.profile.description,
    avatar: state.profile.avatar,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoContainer);
