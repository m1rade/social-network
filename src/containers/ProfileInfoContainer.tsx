import React from "react";
import { connect } from "react-redux";
import { ProfileInfo } from "../components/Profile/ProfileInfo/ProfileInfo";

export const ProfileInfoContainer = (props) => {
    return <ProfileInfo name={props.name} description={props.description} avatar={props.avatar} />
};

const mapStateToProps = (state) => ({
    name: state.profile.name,
    description: state.profile.description,
    avatar: state.profile.avatar,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoContainer);
