const express = require('express')

const router = express.Router();

const logger = require('../middleware/logger')
const { greetMessageController } = require('../controller/homeController')


router.get('/:name', logger, greetMessageController);

module.exports = router