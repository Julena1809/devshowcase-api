const profileService = require('../services/profileService');
const CreateProfileDTO = require('../dtos/CreateProfileDTO');

class ProfileController {
    async create(req, res) {
        try {
            const validation = CreateProfileDTO.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    errors: validation.error.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                });
            }

            const profile = await profileService.create(validation.data);

            return res.status(201).json(profile);

        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({
                    error: 'Este e-mail já está cadastrado.'
                });
            }

            console.error(error);

            return res.status(500).json({
                error: 'Erro interno do servidor.'
            });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    error: 'ID inválido.'
                });
            }

            const profile = await profileService.findById(id);

            if (!profile) {
                return res.status(404).json({
                    error: 'Perfil não encontrado.'
                });
            }

            return res.status(200).json(profile);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Erro interno do servidor.'
            });
        }
    }
}

module.exports = new ProfileController();
