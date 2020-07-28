const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/key")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        default: 18
    },
    country: {
        type: String,
        default: "USA"
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

userSchema.statics.userCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Wrong Email!')
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        throw new Error('Wrong Password!')
    }

    return user
}

userSchema.methods.createAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id.toString() }, config.jwtSecret)

    this.tokens = this.tokens.concat({ token })

    await this.save()

    return token
}

userSchema.pre("save", async function (next) {
    let user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User