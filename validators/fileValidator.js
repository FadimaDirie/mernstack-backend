// fileValidator.js
const { body } = require('express-validator');

exports.validateFile = [
body('filename').notEmpty().withMessage('Filename is required'),
body('url').isURL().withMessage('Valid URL is required'),
body('uploadedBy').notEmpty().withMessage('Uploader is required'),
];