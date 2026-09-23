const CreateProjectDTO = require('../dtos/CreateProjectDTO');
const projectService = require('../services/projectService');

const projectController = {
  async create(req, res) {
    const validation = CreateProjectDTO.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: 'Dados inválidos.',
        details: validation.error.issues
      });
    }

    try {
      const project = await projectService.create(validation.data);

      return res.status(201).json(project);
    } catch (error) {
      console.error(error);

      if (error.code === 'P2025' || error.code === 'P2003') {
        return res.status(400).json({
          error: 'Perfil ou tecnologia informada não existe.'
        });
      }

      return res.status(500).json({
        error: 'Erro interno do servidor.'
      });
    }
  },

  async findAll(req, res) {
    try {
      const projects = await projectService.findAll();
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Erro interno do servidor.'
      });
    }
  }
};

module.exports = projectController;
