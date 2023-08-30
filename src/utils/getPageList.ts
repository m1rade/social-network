function getPageList(totalCount: number, currentPage: number, pageSize: number): getPageListReturnType {
    const totalPages = Math.ceil(totalCount / pageSize);
    let slicedPages;
    let pagesArr = [];

    for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(i);
    }

    if (currentPage - 5 < 0) {
        slicedPages = pagesArr.slice(0, 10);
    } else {
        slicedPages = pagesArr.slice(currentPage - 5, currentPage + 5);
    }

    return { pages: slicedPages, totalPages };
}

export default getPageList;

type getPageListReturnType = {
    pages: number[];
    totalPages: number;
};
