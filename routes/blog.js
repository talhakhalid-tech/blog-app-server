const express = require("express")
const Blog = require("../model/blog")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/blogs/create", auth, async (req, res) => {
    try {
        const blog = new Blog({ title: req.body.title, body: req.body.body, author: req.user.name, authorID: req.user._id, date: new Date() })
        await blog.save()
        res.json({ blog })
    } catch (e) {
        res.status(400).json({ error: "Blog not created!" })
    }
})

router.post("/blogs/fetchall", async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ date: -1 })
        res.json({ blogs })

    } catch (e) {
        res.status(500).json({ error: "Server Error!" })
    }
})

router.post("/blogs/fetchbyid", async (req, res) => {
    try {
        const blog = await Blog.findById(req.body.id)
        res.json({ blog })

    } catch (e) {
        res.status(500).json({ error: "Server Error!" })
    }
})

router.post("/blogs/fetchbyuser", async (req, res) => {
    try {
        const blogs = await Blog.find({ authorID: req.body.authorID })
        res.json({ blogs })

    } catch (e) {
        res.status(500).json({ error: "Server Error!" })
    }
})

module.exports = router