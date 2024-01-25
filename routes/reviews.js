const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews')

router.post('/',reviews.createReview)

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;