const getResponse = (statusCode, result, reason, data, pagination) => {
  if (result) {
    if (pagination) {
      return {
        status: statusCode,
        data: {
          result: true,
          reason: reason,
          data: data,
          pagination: getPagination(
            pagination.pageNo,
            pagination.pageSize,
            pagination.count
          ),
        },
      };
    } else {
      return {
        status: statusCode,
        data: {
          result: true,
          reason: reason,
          data: data,
        },
      };
    }
  } else {
    return {
      status: statusCode,
      data: {
        result: false,
        reason: reason,
        data: data,
      },
    };
  }
};

const getPagination = (pageNo, pageSize, count) => {
  const totalPages = Math.ceil(count / pageSize);
  const remainingPages = totalPages - pageNo;

  return {
    currentPage: pageNo,
    totalPages,
    totalItems: count,
    remainingPages,
  };
};

module.exports = getResponse;
