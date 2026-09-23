const { z } = require('zod');

const CreateFeedbackDTO = z.object({
  rating: z.number().int().min(1, 'A nota deve ser no mínimo 1').max(5, 'A nota deve ser no máximo 5'),
  comment: z.string().min(1, 'Comentário é obrigatório'),
});

module.exports = CreateFeedbackDTO;
