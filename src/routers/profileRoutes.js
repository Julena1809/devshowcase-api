const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.post('/', (req, res) => {
    profileController.create(req, res);
});

module.exports = router;

