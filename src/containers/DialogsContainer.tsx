import React from "react";
import { connect } from "react-redux";
import { Dialogs } from "../components/Messages/Dialogs/Dialogs";
import { FriendsType } from "../redux/friends_reducer";
import { AppStateType } from "../redux/store";

type DialogsContainerPropsType = {
    friends: FriendsType[]
}

export const DialogsContainer = (props: DialogsContainerPropsType) => {
    const mappedDialogs = props.friends.map((f) => (
        <Dialogs key={f.id} userID={f.id} userName={f.name} />
    ));
    return <>{mappedDialogs}</>;
};

const mapStateToProps = (state: AppStateType): DialogsContainerPropsType => ({ friends: state.friends });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
