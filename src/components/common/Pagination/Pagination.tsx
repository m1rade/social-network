import React from "react";
import getPageList from "../../../utils/getPageList";
import s from "./Pagination.module.css";

type PaginationPropsType = {
    totalCount: number;
    curPage: number;
    pageSize: number;
    changeCurrentPage: (curPage: number) => void;
};

export const Pagination: React.FC<PaginationPropsType> = ({ totalCount, curPage, pageSize, changeCurrentPage }) => {
    const mappedPages = getPageList(totalCount, curPage, pageSize).map(p => {
        const spanPageClass = curPage === p ? `${s.currentPage} ${s.page}` : s.page;

        return (
            <span key={p} className={spanPageClass} onClick={() => changeCurrentPage(p)}>
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
