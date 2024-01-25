const express = require('express');
const router = express.Router({ mergeParams: true });
const surveys = require('../controllers/surveys')

router
.route("/")
.get(surveys.showRecords)
.post(surveys.createSurveyRecord);

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;