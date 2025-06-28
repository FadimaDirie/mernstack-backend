const express = require('express');
const router = express.Router();

const {
  createMetric,
  getUserMetrics,
  updateMetric,
  deleteMetric,
  getDashboardSummary
} = require('../controllers/metricController');
const auth = require('../middlewares/authMiddleware');

// CRUD Routes
router.post('/', createMetric);
router.get('/:user_id', getUserMetrics);
router.put('/:id', updateMetric);
router.delete('/:id', deleteMetric);
router.get('/summary', getDashboardSummary);

module.exports = router;
