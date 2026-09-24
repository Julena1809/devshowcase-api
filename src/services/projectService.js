const projectRepository = require('../repositories/projectRepository');

const projectService = {
  async create(data) {
    return projectRepository.create(data);
  },

  async findAll() {
    return projectRepository.findAll();
  },
  async upvote(id) {
    return projectRepository.incrementUpvotes(id);
  },
};

module.exports = projectService;


