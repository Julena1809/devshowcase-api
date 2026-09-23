const projectRepository = require('../repositories/projectRepository');

const projectService = {
  async create(data) {
    return projectRepository.create(data);
  },

  async findAll() {
    return projectRepository.findAll();
  }
};

module.exports = projectService;


