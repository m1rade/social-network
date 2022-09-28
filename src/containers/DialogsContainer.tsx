import React from "react";
import { connect } from "react-redux";
import { Dialogs } from "../components/Messages/Dialogs/Dialogs";

export const DialogsContainer = (props) => {
    const mappedDialogs = props.friends.map((f) => (
        <Dialogs key={f.id} userID={f.id} userName={f.name} />
    ));
    return <>{mappedDialogs}</>;
};

const mapStateToProps = (state) => ({ friends: state.friends });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
