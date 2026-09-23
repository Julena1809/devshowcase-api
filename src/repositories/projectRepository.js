const prisma = require('../database/prisma');

const projectRepository = {
  async create(data) {
    const { technologyIds, ...projectData } = data;

    return prisma.project.create({
      data: {
        ...projectData,
        technologies: {
          create: technologyIds.map((technologyId) => ({
            technology: {
              connect: {
                id: technologyId
              }
            }
          }))
        }
      },
      include: {
        technologies: {
          include: {
            technology: true
          }
        }
      }
    });
  },

  async updateAverageRating(projectId, averageRating) {
    return prisma.project.update({
      where: { id: projectId },
      data: { averageRating },
    });
  },

  async findAll() {
    return prisma.project.findMany({
      include: {
        profile: true,
        technologies: {
          include: {
            technology: true
          }
        }
      }
    });
  },

  async findById(id) {
    return prisma.project.findUnique({
      where: { id }
    });
  }
};

module.exports = projectRepository;
