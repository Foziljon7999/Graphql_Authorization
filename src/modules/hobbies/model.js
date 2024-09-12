const { Schema, model } = require("mongoose")

const hobbySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }
},{
    collection: "hobbies"
})

module.exports = model("Hobby", hobbySchema)
