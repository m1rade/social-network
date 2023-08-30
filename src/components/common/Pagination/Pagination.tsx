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
    const { pages, totalPages } = getPageList(totalCount, curPage, pageSize);

    const mappedPages = pages.map(p => {
        const spanPageClass = curPage === p ? `${s.currentPage} ${s.page}` : s.page;

        return (
            <li key={p}>
                <span key={p} className={spanPageClass} onClick={() => changeCurrentPage(p)}>
                    {p}
                </span>
            </li>
        );
    });

    return (
        <div className={s.container}>
            <span>Pages:</span>
            <ul className={s.list}>
                {curPage !== 1 && (
                    <>
                        <li>
                            <span className={s.arrow} onClick={() => changeCurrentPage(1)}>
                                {"<<"}
                            </span>
                        </li>
                        <li>
                            <span className={s.arrow} onClick={() => changeCurrentPage(curPage - 1)}>
                                {"<"}
                            </span>
                        </li>
                    </>
                )}
                {mappedPages}
                {curPage !== totalPages && (
                    <>
                        <li>
                            <span className={s.arrow} onClick={() => changeCurrentPage(curPage + 1)}>
                                {">"}
                            </span>
                        </li>
                        <li>
                            <span className={s.arrow} onClick={() => changeCurrentPage(totalPages)}>
                                {">>"}
                            </span>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};
