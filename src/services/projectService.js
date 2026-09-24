const projectRepository = require('../repositories/projectRepository');

const projectService = {
  async create(data) {
    return projectRepository.create(data);
  },

  async findAll(filters) {
    return projectRepository.findAll(filters);
  },
  async upvote(id) {
    return projectRepository.incrementUpvotes(id);
  },
};

module.exports = projectService;


