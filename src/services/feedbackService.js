const feedbackRepository = require('../repositories/feedbackRepository');
const projectRepository = require('../repositories/projectRepository');

async function createFeedback(projectId, data) {
  const project = await projectRepository.findById(projectId);
  if (!project) {
    const error = new Error('Projeto não encontrado.');
    error.statusCode = 404;
    throw error;
  }

  await feedbackRepository.create({ ...data, projectId });

  const newAverage = await feedbackRepository.findAverageByProjectId(projectId);
  await projectRepository.updateAverageRating(projectId, newAverage);

  return newAverage;
}

module.exports = { createFeedback };
