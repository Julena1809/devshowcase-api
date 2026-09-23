const { z } = require('zod');

const CreateProjectDTO = z.object({
  title: z.string().trim().min(1, 'O título é obrigatório.'),

  description: z.string().trim().min(1, 'A descrição é obrigatória.'),

  pdfUrl: z.string().trim().url('Informe uma URL válida para o PDF.'),

  profileId: z.number().int().positive(),

  technologyIds: z.array(
    z.number().int().positive()
  ).min(1, 'Informe pelo menos uma tecnologia.')
});

module.exports = CreateProjectDTO;