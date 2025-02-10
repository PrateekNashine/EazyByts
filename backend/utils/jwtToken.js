export const generateToken = (user, message, stausCode, res) => {
  const token = user.generateJsonWebToken();
  res.status(stausCode).cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }).json({
    success: true,
    message,
    token,
    user
  });
};
