const express = require("express")
const User = require("../model/user")
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/users/register', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).json({ message: "User successfully created!" })
    } catch (error) {
        res.status(500).json({ error })
    }

})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.userCredentials(req.body.email, req.body.password)
        const token = await user.createAuthToken()
        res.status(200).json({ user: user, token: token, message: "User successfully logged In!" })
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('User logged out successfully')
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/fetchuser', auth, async (req, res) => {
    try {
        res.json({ user: req.user })
    } catch (error) {
        res.status(500).send()
    }
})

router.post("/users/fetchallusers", async (req, res) => {
    try {
        const users = await User.find({})
        res.json({ users: users })
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router