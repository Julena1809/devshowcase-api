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
  }
};

module.exports = projectRepository;
