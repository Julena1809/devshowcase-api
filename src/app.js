const express = require('express');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'DevShowcase API funcionando!'
    });
});
app.use('/api/profiles', profileRoutes);

module.exports = app;

