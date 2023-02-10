import React from "react";
import {connect} from "react-redux";
import {ProfileInfo} from "../components/Profile/ProfileInfo/ProfileInfo";
import {AppStateType} from "../redux/store";



export const ProfileInfoContainer: React.FC<ProfileInfoContainerPropsType> = (props) => {
    return <ProfileInfo name={props.name} about={props.about} photo={props.photo}/>
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    name: state.profile.fullName,
    about: state.profile.aboutMe,
    photo: state.profile.photos.small,
});


export default connect(mapStateToProps, {})(ProfileInfoContainer);

//types
type mapStateToPropsType = {
    name: string,
    about: string,
    photo: string
}

export type ProfileInfoContainerPropsType = mapStateToPropsType;