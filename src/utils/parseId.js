const AppError = require('../errors/AppError');

function parseId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('ID inválido.', 400);
  }

  return id;
}

module.exports = parseId;
