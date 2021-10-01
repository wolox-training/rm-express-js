exports.pagination = query => {
  const page = query.page ? query.page - 1 : 0;
  const limit = query.limit || 10;
  const offset = limit * page;
  return { page, limit, offset };
};
