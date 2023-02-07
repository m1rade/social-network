import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    follow_unfollowAC,
    SearchActionType,
    setUsersAC,
    UserType,
} from "../../../redux/search_reducer";
import { AppStateType } from "../../../redux/store";
import { User } from "./User/User";

export const Users: React.FC<UsersPropsType> = (props) => {
    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then((resp) => {
                props.setUsers(resp.data.items);
            })
            .catch((err) => {
                alert(err);
            });
    }

    const mappedUsers = props.users.map((u) => {
        return (
            <User
                key={u.id}
                user={u}
                followUnfollowHandler={() => props.followUnfollowHandler(u.id)}
            />
        );
    });

    return (
        <div style={{height: "100vh", overflow: "auto"}}>
            Users
            <br />
            <hr />
            {mappedUsers}
        </div>
    );
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.search.items,
});

const mapDispatchToProps = (
    dispatch: Dispatch<SearchActionType>
): mapDispatchToPropsType => ({
    setUsers: (items: UserType[]) => dispatch(setUsersAC(items)),
    followUnfollowHandler: (id: number) => dispatch(follow_unfollowAC(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

//types
type mapStateToPropsType = {
    users: UserType[];
};

type mapDispatchToPropsType = {
    setUsers: (items: UserType[]) => void;
    followUnfollowHandler: (id: number) => void;
};

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;
