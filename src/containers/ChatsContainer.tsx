import React from "react";
import {connect} from "react-redux";
import {Chats} from "../components/Messages/Chats/Chats";
import {FriendsType} from "../redux/friends_reducer";
import {AppStateType} from "../redux/store";

type ChatsContainerPropsType = {
    friends: FriendsType[]
}

export const ChatsContainer = (props: ChatsContainerPropsType) => {
    const mappedChats = props.friends.map((f) => (
        <Chats key={f.id} userID={f.id} userName={f.name} />
    ));
    return <>{mappedChats}</>;
};

const mapStateToProps = (state: AppStateType): ChatsContainerPropsType => ({ friends: state.friends });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer);
