const express = require('express');
const profileRoutes = require('./routers/profileRoutes');
const technologyRoutes = require('./routers/technologyRoutes');
const projectRoutes = require('./routers/ProjectRoutes');

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

module.exports = app;

