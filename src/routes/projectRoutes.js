const express = require('express');
const projectController = require('../controllers/projectController');
const feedbackRoutes = require('./feedbackRoutes');

const router = express.Router();

router.post('/', projectController.create);
router.get('/', projectController.findAll);
router.put('/:id/upvote', projectController.upvote);
router.use('/:id/feedbacks', feedbackRoutes);

module.exports = router;
