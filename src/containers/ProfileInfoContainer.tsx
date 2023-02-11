import React from "react";
import {connect} from "react-redux";
import {ProfileInfo} from "../components/Profile/ProfileInfo/ProfileInfo";
import { ProfileResponseType } from "../redux/profile_reducer";
import {AppStateType} from "../redux/store";



export const ProfileInfoContainer: React.FC<ProfileInfoContainerPropsType> = (props) => {
    return <ProfileInfo userInfo={ {...props.userInfo} }/>
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    userInfo: state.profile.userInfo
});


export default connect(mapStateToProps, {})(ProfileInfoContainer);

//types
type mapStateToPropsType = {
    userInfo: ProfileResponseType
}

export type ProfileInfoContainerPropsType = mapStateToPropsType;