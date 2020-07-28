const mongoose = require("mongoose")
const config = require("../config/key")

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB connected")
}).catch((error) => {
    console.log(error)
})
