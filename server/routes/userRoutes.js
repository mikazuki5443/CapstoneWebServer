const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login',userController.LoginUser);
router.post('/logout', authMiddleware, userController.LogoutUser);
router.get('/profile',authMiddleware, userController.getUserProfile);

module.exports = router;