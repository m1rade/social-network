import React from "react";
import {connect} from "react-redux";
import {ProfileInfo} from "../components/Profile/ProfileInfo/ProfileInfo";
import {AppStateType} from "../redux/store";

type mapStateToPropsType = {
    name: string,
    description: string,
    avatar: string
}

export type ProfileInfoContainerPropsType = mapStateToPropsType;

export const ProfileInfoContainer: React.FC<ProfileInfoContainerPropsType> = (props) => {
    return <ProfileInfo name={props.name} description={props.description} avatar={props.avatar}/>
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    name: state.profile.name,
    description: state.profile.description,
    avatar: state.profile.avatar,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoContainer);
