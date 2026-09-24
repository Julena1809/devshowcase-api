const { ZodError } = require('zod');

function errorHandler(err, req, res, next) {
  // Dados inválidos (Zod)
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      error: 'Dados inválidos.',
      details: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  // JSON malformado no corpo da requisição
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 400, error: 'JSON malformado.' });
  }

  // Erros do Prisma
  if (err.code === 'P2002') {
    return res.status(409).json({ status: 409, error: 'Registro já existe.' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ status: 404, error: 'Registro não encontrado.' });
  }
  if (err.code === 'P2003') {
    return res.status(400).json({ status: 400, error: 'Referência inválida: o registro relacionado não existe.' });
  }

  // Erros com status definido (AppError, service lançando 404 etc.)
  if (err.statusCode && err.statusCode < 500) {
    return res.status(err.statusCode).json({ status: err.statusCode, error: err.message });
  }

  // Qualquer outro erro
  console.error(err);
  return res.status(500).json({ status: 500, error: 'Erro interno do servidor.' });
}

module.exports = errorHandler;
