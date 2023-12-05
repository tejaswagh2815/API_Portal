const getQueryParams = (queryParams) => {
  const pageNo = parseInt(queryParams.pageNo) || 1;
  const pageSize = parseInt(queryParams.pageSize) || 10;
  const offset = (pageNo - 1) * pageSize;
  const search = queryParams.search || "";
  return {
    pageNo,
    pageSize,
    offset,
    search,
  };
};

module.exports = getQueryParams;
