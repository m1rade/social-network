import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FriendsType } from "../../../redux/friends_reducer";
import { AppStateType } from "../../../redux/store";
import s from "./Chats.module.css";

export const Chats: React.FC<ChatsPropsType> = (props) => {
    return (
        <div className={s.dialogs}>
            {props.friends.map((f) => {
                return (
                    <div key={f.id} className={s.dialogItem}>
                        <NavLink activeClassName={s.active} to={`/dialog/${f.id}`}>
                            {f.name}
                        </NavLink>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapPropsType => ({ friends: state.friends });

export default connect<MapPropsType, {}, {}, AppStateType>(mapStateToProps, {})(Chats);

type MapPropsType = {
    friends: FriendsType[];
};

export type ChatsPropsType = MapPropsType;
