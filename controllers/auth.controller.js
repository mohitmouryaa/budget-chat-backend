const { OAuth2Client } = require("google-auth-library");
const catchAsync = require("./../utils/catchAsync");
const client = new OAuth2Client();

exports.googleAuth = catchAsync(async (req, res, next) => {
  const { credential, client_id } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: client_id,
  });
  const payload = ticket.getPayload();
  res.status(200).json({ payload });
});
