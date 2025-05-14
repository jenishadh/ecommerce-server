export const port = process.env.PORT || 8000;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
export const accessTokenExpiresIn = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES_IN!
);
export const refreshTokenExpiresIn = parseInt(
  process.env.REFRESH_TOKEN_EXPIRES_IN!
);
