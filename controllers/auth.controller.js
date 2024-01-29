const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

exports.googleAuth = async (req, res) => {
    const { credential, client_id } = req.body
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        })
        const payload = ticket.getPayload()
        res.status(200).json({ payload })
    } catch (err) {
        res.status(400).json({ err })
    }
}
