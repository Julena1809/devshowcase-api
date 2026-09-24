const CreateProjectDTO = require('../dtos/CreateProjectDTO');
const ListProjectsQueryDTO = require('../dtos/ListProjectsQueryDTO');
const projectService = require('../services/projectService');
const AppError = require('../errors/AppError');
const parseId = require('../utils/parseId');

const projectController = {
  async create(req, res) {
    const data = CreateProjectDTO.parse(req.body);

    try {
      const project = await projectService.create(data);
      return res.status(201).json(project);
    } catch (error) {
      if (error.code === 'P2025' || error.code === 'P2003') {
        throw new AppError('Perfil ou tecnologia informada não existe.', 400);
      }
      throw error;
    }
  },

  async findAll(req, res) {
    const filters = ListProjectsQueryDTO.parse(req.query);
    const result = await projectService.findAll(filters);
    return res.status(200).json(result);
  },

  async upvote(req, res) {
    const id = parseId(req.params.id);
    const project = await projectService.upvote(id);
    return res.status(200).json(project);
  }
};

module.exports = projectController;
