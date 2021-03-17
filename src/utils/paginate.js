export const paginate = (req) => {
  const page = parseInt(req.query.page, 10) || null;
  const limit = parseInt(req.query.limit, 10) || null;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  console.log(endIndex);
  return {
    limit,
    startIndex,
    endIndex,
    page,
  };
};

export const addPaginatedInfo = async ({
  model,
  endIndex,
  page,
  limit,
  startIndex,
}) => {
  const results = {};
  if (endIndex < (await model.count()) && endIndex > 0) {
    results.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }
  return results;
};

export const paginatedResult = (paginatedInfo, data) => {
  const packedResult = {
    ...paginatedInfo,
    data,
  };
  return packedResult;
};
