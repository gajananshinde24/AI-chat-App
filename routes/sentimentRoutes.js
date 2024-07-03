
const express = require('express')

const router = express.Router();

const logger = require('../middlewares/logger')
const {sentimentAnalyzeController, sentimentListController, sentimentSummaryController} = require('../controllers/sentimentController')
const authenticate = require('../middlewares/authMiddleware')




router.post('/analyze', logger, sentimentAnalyzeController);
router.post('/analyze-list', logger,authenticate, sentimentListController);
router.post('/analyze-summary', logger,authenticate, sentimentSummaryController);


module.exports = router;