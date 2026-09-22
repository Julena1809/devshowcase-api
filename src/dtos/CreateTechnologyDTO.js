const { z } = require('zod');

const CreateTechnologyDTO = z.object({
    name: z.string()
        .trim()
        .min(1, 'O nome da tecnologia é obrigatório'),

    description: z.string()
        .trim()
        .optional()
});

module.exports = CreateTechnologyDTO;
