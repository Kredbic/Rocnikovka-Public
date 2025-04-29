const Review = require("../models/Review");

// GET all reviews
exports.getAllReviews = async (req, res, next) => {
    try {
        const data = await Review.find().populate("user_id", "name");
        if (data && data.length !== 0) {
            return res.status(200).send({
                message: "Reviews found",
                payload: data
            })
        }
        res.status(404).send({
            message: "Reviews not found"
        })
    } catch (e) {
        res.status(500).send(e);
    }
};

// CREATE review
exports.createReview = async (req, res, next) => {
    try {
        const data = new Review({
            user_id: req.body.user_id,
            text: req.body.text,
            review: req.body.review,
        })
        const result = await data.save();
        if (result) {
            return res.status(201).send({
                message: "Review created",
                payload: result
            })
        }
        res.status(404).send({
            message: "Review not created"
        })
    } catch (e) {
        res.status(500).send(e);
    }
};

// DELETE review
exports.deleteReview = async (req, res, next) => {
    try {
        const result = await Review.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(200).send({
                message: "Review deleted",
                payload: result
            })
        }
        res.status(404).send({
            message: "Review not deleted"
        })
    } catch (e) {
        res.status(500).send(e);
    }
};