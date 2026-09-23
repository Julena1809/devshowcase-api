const express = require('express');
const technologyController = require('../controllers/technologyController');

const router = express.Router();

router.post('/', (req, res) => {
    technologyController.create(req, res);
});

router.get('/', (req, res) => {
    technologyController.findAll(req, res);
});

module.exports = router;
