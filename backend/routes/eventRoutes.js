const express = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, admin, create);
router.put('/:id', protect, admin, update);
router.delete('/:id', protect, admin, remove);

export default router;
