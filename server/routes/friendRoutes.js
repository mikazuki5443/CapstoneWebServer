const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/request', authMiddleware, friendController.sendFriendRequest);
router.post('/accept', authMiddleware, friendController.acceptFriendRequest);
router.get('/list/:user_no', authMiddleware, friendController.getFriendList);

module.exports = router;