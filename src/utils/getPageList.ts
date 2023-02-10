function getPageList (totalCount: number, currentPage: number, pageSize: number): Array<number> {
    const totalPages = Math.ceil(totalCount / pageSize);
    let slicedPages;
    let pagesArr = [];

    for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(i);
    }

    if (currentPage - 6 < 0) {
        slicedPages = pagesArr.slice(0, 11);
    } else {
        slicedPages = pagesArr.slice(currentPage - 6, currentPage + 5);
    }

    return slicedPages;
};

export default getPageList;
