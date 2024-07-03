const {sentimentAnalyze, analyzeList, summarize} = require('../services/sentimentService')
const asyncHandler = require('../utils/asyncHandler')


const sentimentAnalyzeController = asyncHandler(async (req,res,next) => {
        const text = req.body.text;
        const result = await sentimentAnalyze(text);
        res.json({ text , sentiment : result});
})

const sentimentListController = asyncHandler(async (req, res, next) => {
    const texts = req.body.texts;
    const results = await analyzeList(texts);
    res.json(results);
});

const sentimentSummaryController = asyncHandler(async (req, res, next) => {
    const texts = req.body.texts;
    const summary = await summarize(texts);
    res.json(summary);
});

module.exports = {sentimentAnalyzeController, sentimentListController, sentimentSummaryController}