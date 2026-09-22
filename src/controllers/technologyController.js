const technologyService = require('../services/technologyService');
const CreateTechnologyDTO = require('../dtos/CreateTechnologyDTO');

class TechnologyController {
    async create(req, res) {
        try {
            const validation = CreateTechnologyDTO.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    errors: validation.error.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                });
            }

            const technology = await technologyService.create(validation.data);

            return res.status(201).json(technology);

        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({
                    error: 'Esta tecnologia já está cadastrada.'
                });
            }

            console.error(error);

            return res.status(500).json({
                error: 'Erro interno do servidor.'
            });
        }
    }

    // NOVO MÉTODO: listar todas as tecnologias
    async findAll(req, res) {
        try {
            const technologies = await technologyService.findAll();

            return res.status(200).json(technologies);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Erro interno do servidor.'
            });
        }
    }
}

module.exports = new TechnologyController();