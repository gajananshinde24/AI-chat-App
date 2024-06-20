
const express = require('express')

const router = express.Router();

const logger = require('../middleware/logger')
const {sentimentAnalyzeController, sentimentListController, sentimentSummaryController} = require('../controller/sentimentController')

router.post('/analyze', logger, sentimentAnalyzeController);
router.post('/analyze-list', logger, sentimentListController);
router.post('/analyze-summary', logger, sentimentSummaryController);


module.exports = router;