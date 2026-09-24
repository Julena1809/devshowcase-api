const { z } = require('zod');

const ListProjectsQueryDTO = z.object({
  technology: z.string().trim().min(1).optional(),

  page: z.coerce.number().int().min(1, 'A página deve ser no mínimo 1').default(1),

  limit: z.coerce.number().int()
    .min(1, 'O limite deve ser no mínimo 1')
    .max(50, 'O limite deve ser no máximo 50')
    .default(10),
});

module.exports = ListProjectsQueryDTO;
