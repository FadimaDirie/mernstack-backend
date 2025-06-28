// fileRoutes.js
const express = require('express');
const fileController = require('../controllers/fileController');

const auth = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/', fileController.uploadFile);
router.get('/', fileController.getAllFiles);

module.exports = router;
