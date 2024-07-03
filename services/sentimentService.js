const Sentiment = require('sentiment')

const sentiment = new Sentiment();




const sentimentAnalyze =  async (text) => {
   
    const result = sentiment.analyze(text);
    console.log(result);
  
    if(result.score < 0 ) {
        return "negative"
    } else if (result.score > 0) {
        return "positive"
    } else {
        return "Neutral";
    }


}

const analyzeList = async (texts) => {
    if (!Array.isArray(texts)) {
        throw new Error('Please provide an array of texts');
    }

    const analysisResults = await Promise.all(texts.map(async text => ({
        text,
        sentiment: await sentimentAnalyze(text)
    })));
    return analysisResults;
};

const summarize = async (texts) => {
    const results = await analyzeList(texts);
    const summary = results.reduce((acc, { sentiment }) => {
        acc[sentiment]++;
        return acc;
    }, { positive: 0, negative: 0, neutral: 0 });

    return summary;
};

module.exports = { sentimentAnalyze , analyzeList, summarize};