const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 15,
        maxlength: 200,
        required: true,
        trim: true
    },
    body: {
        type: String,
        minLength: 200,
        maxlength: 10000,
        required: true,
        trim: true
    },
    date: {
        type: Date
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    authorID: {
        type: mongoose.ObjectId,
        required: true,
        trim: true
    }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog