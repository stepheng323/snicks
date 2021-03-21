export const catchAsync = (func) => (req, res, next) => {
  func(req, res, next).catch(next);
};

export const stripeUserData = (user) => {
  user.password = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;
  user.refreshToken = undefined;
  return user;
};
