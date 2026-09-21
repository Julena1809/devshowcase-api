const { z } = require('zod');

const CreateProfileDTO = z.object({
    name: z.string()
        .trim()
        .min(1, 'O nome é obrigatório'),

    email: z.string()
        .trim()
        .email('E-mail inválido'),

    bio: z.string()
        .optional()
});

module.exports = CreateProfileDTO;