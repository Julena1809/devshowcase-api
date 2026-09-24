const express = require('express');
const profileRoutes = require('./routes/profileRoutes');
const technologyRoutes = require('./routes/technologyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./docs/openapi');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'DevShowcase API funcionando!'
    });
});
app.use('/api/profiles', profileRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', projectRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use((req, res) => {
  res.status(404).json({ status: 404, error: 'Rota não encontrada.' });
});

app.use((req, res) => {
  res.status(404).json({ status: 404, error: 'Rota não encontrada.' });
});

app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message || 'Erro interno no servidor.' });
});

module.exports = app;

