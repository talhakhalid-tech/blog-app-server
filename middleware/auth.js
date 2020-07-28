const User = require("../model/user")
const jwt = require("jsonwebtoken")
const config = require("../config/key")

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.jwtSecret)
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).json({ error: "User not authenticated" })
    }
}

module.exports = auth