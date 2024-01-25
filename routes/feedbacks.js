const express = require('express');
const router = express.Router({ mergeParams: true });
const feedbacks = require('../controllers/feedbacks')

router.post('/',feedbacks.createFeedback)

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;