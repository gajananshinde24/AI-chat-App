const express = require('express')

const router = express.Router();

const logger = require('../middlewares/logger')

const { registerUser, authUser, getProfile, handleQuestionController, updateUserProfile } = require('../controllers/userController')

router.post('/register', logger, registerUser);

router.post('/login', logger, authUser);
router.post('/get-profile', logger, getProfile);
router.put('/update-profile/:userId', logger, updateUserProfile);

router.post('/chat', logger, handleQuestionController);


module.exports = router