import React from "react";
import { connect } from "react-redux";
import { getUsersThunk } from "../../redux/search_reducer";
import { selectCurPage, selectItemsPerPage, selectTotalCount } from "../../redux/selectors/selectors";
import { AppStateType } from "../../redux/store";
import { Pagination } from "../common/Pagination/Pagination";
import UsersContainer from "./Users/UsersContainer";

class SearchContainer extends React.Component<SearchContainerPropsType> {
    componentDidMount() {
        const { itemsPerPage, curPage } = this.props;
        this.props.getUsersThunk(itemsPerPage, curPage);
    }

    changePageHandler = (curPage: number) => {
        const { itemsPerPage } = this.props;
        this.props.getUsersThunk(itemsPerPage, curPage);
    };

    render(): React.ReactNode {
        const { totalCount, curPage, itemsPerPage } = this.props;

        return (
            <div style={{ height: "100vh", overflow: "auto" }}>
                <span>Users</span>
                <br />
                <hr />
                <Pagination
                    totalCount={totalCount}
                    curPage={curPage}
                    pageSize={itemsPerPage}
                    changeCurrentPage={this.changePageHandler}
                />
                <UsersContainer />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    totalCount: selectTotalCount(state),
    curPage: selectCurPage(state),
    itemsPerPage: selectItemsPerPage(state),
});

export const SearchPage = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getUsersThunk,
})(SearchContainer);

//types
type MapStatePropsType = {
    totalCount: number;
    curPage: number;
    itemsPerPage: number;
};

type MapDispatchPropsType = {
    getUsersThunk: (itemsPerPage: number, curPage: number) => void;
};

type SearchContainerPropsType = MapStatePropsType & MapDispatchPropsType;
