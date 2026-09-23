const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router({ mergeParams: true });

router.post('/', feedbackController.create);

module.exports = router;

