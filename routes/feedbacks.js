const express = require('express');
const router = express.Router({ mergeParams: true });
const feedbacks = require('../controllers/feedbacks')
const secretKey = process.env.SECRET || 'thisshouldbeabettersecret!';

const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
  
      
      if (decoded.phoneNumber === req.session.phoneNumber) {
        
        req.phoneNumber = decoded.phoneNumber;
        next();
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
  



router.post('/',authenticateJWT, feedbacks.createFeedback)

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;