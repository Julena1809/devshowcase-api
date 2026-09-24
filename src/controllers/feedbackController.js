const feedbackService = require('../services/feedbackService');
const CreateFeedbackDTO = require('../dtos/CreateFeedbackDTO');
const parseId = require('../utils/parseId');

async function create(req, res, next) {
  try {
    const projectId = parseId(req.params.id);
    const data = CreateFeedbackDTO.parse(req.body);

    const averageRating = await feedbackService.createFeedback(projectId, data);

    res.status(201).json({
      message: 'Feedback registrado com sucesso.',
      averageRating,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { create };

