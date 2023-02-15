import React from "react";
import {connect} from "react-redux";
import { ProfileResponseType } from "../api/social-networkAPI";
import {ProfileInfo} from "../components/Profile/ProfileInfo/ProfileInfo";
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