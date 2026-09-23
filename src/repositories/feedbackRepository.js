const prisma = require('../database/prisma'); // ajuste o caminho conforme seu projeto

async function create(data) {
  return prisma.feedback.create({ data });
}

async function findAverageByProjectId(projectId) {
  const result = await prisma.feedback.aggregate({
    where: { projectId },
    _avg: { rating: true },
  });
  return result._avg.rating ?? 0;
}

module.exports = { create, findAverageByProjectId };


