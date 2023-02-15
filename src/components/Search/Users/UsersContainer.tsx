import React from "react";
import { connect } from "react-redux";
import { UserType } from "../../../api/social-networkAPI";
import {
    follow_UnfollowUserThunk,
    getUsersThunk
} from "../../../redux/search_reducer";
import { AppStateType } from "../../../redux/store";
import Preloader from "../../common/Preloader";
import { Users } from "./Users";

class UsersContainer extends React.Component<UsersContainerPropsType, AppStateType> {
    componentDidMount() {
        this.props.getUsersThunk(this.props.itemsPerPage, this.props.curPage);
    }

    changePageHandler = (curPage: number) => {
        this.props.getUsersThunk(this.props.itemsPerPage, curPage);
    };

    followUnfollowHandler = (userID: number, followed: boolean) => {
        this.props.follow_UnfollowUserThunk(userID, followed);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? (
                    <Preloader />
                ) : (
                    <Users
                        users={this.props.users}
                        totalCount={this.props.totalCount}
                        curPage={this.props.curPage}
                        itemsPerPage={this.props.itemsPerPage}
                        followUnfollowHandler={this.followUnfollowHandler}
                        changePageHandler={this.changePageHandler}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.search.items,
    totalCount: state.search.totalCount,
    curPage: state.search.curPage,
    itemsPerPage: state.search.itemsPerPage,
    isFetching: state.search.isFetching,
});

export default connect(mapStateToProps, {
    getUsersThunk,
    follow_UnfollowUserThunk,
})(UsersContainer);

//types
type mapStateToPropsType = {
    users: UserType[];
    totalCount: number;
    curPage: number;
    itemsPerPage: number;
    isFetching: boolean;
};

type mapDispatchToPropsType = {
    getUsersThunk: (itemsPerPage: number, curPage: number) => void;
    follow_UnfollowUserThunk: (id: number, followed: boolean) => void;
};

type UsersContainerPropsType = mapStateToPropsType & mapDispatchToPropsType;
