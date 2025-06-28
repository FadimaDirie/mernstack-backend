const express = require('express');
const {
  createSession,
  getUserSessions,
  updateSession,
  deleteSession
} = require('../controllers/pomodoroController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();


// CRUD endpoints
router.post('/', createSession);
router.get('/:user_id', getUserSessions);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

module.exports = router;
