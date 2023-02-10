import React from "react";
import getPageList from "../../../../utils/getPageList";
import s from "./Pagination.module.css";

type PaginationPropsType = {
    totalCount: number;
    curPage: number;
    pageSize: number;
    changeCurrentPage: (curPage: number) => void;
};

export const Pagination: React.FC<PaginationPropsType> = (props) => {
    const mappedPages = getPageList(props.totalCount, props.curPage, props.pageSize).map((p) => {
        const spanPageClass = props.curPage === p ? `${s.currentPage} ${s.page}` : s.page;

        return (
            <span key={p} className={spanPageClass} onClick={() => props.changeCurrentPage(p)}>
                {p}{" "}
            </span>
        );
    });

    return (
        <div>
            <span>Pages:</span>
            <br />
            {mappedPages}
        </div>
    );
};
