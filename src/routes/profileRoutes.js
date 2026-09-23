const express = require('express');
const profileController = require('../controllers/profileController');
const { id } = require('zod/locales');

const router = express.Router();

router.post('/', (req, res) => {
    profileController.create(req, res);
});

router.get('/:id', (req, res)=>{
    profileController.getById(req, res)
})
module.exports = router;

