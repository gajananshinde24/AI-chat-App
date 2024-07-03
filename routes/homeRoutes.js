const express = require('express')

const router = express.Router();

const logger = require('../middlewares/logger')
const { greetMessageController, homePage } = require('../controllers/homeController')
const OAuthMiddleware = require('../middlewares/OAuthMiddleware')

router.get('/home', logger, homePage);
router.get('/:name', logger,OAuthMiddleware, greetMessageController);


module.exports = router