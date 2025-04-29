const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text: {type: String, required: true},
    review: {type: Number, required: true},
    dateCreated: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Review", reviewSchema);