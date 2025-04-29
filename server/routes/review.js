const express = require('express');
const router = express.Router();
const reviewControllers = require("../controllers/reviewController");

router.get('/', reviewControllers.getAllReviews);
router.post('/', reviewControllers.createReview);
router.delete('/:id', reviewControllers.deleteReview);

module.exports = router;
