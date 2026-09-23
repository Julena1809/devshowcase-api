const projectRepository = require('../repositories/projectRepository');

const projectService = {
  async create(data) {
    return projectRepository.create(data);
  }
};

module.exports = projectService;