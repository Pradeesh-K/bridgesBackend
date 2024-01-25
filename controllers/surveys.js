const {Survey} = require('../models/survey');


module.exports.showRecords = async (req, res) => { 
    try {
      
        // Aggregate responses by question with counts
        const aggregatedResponses = await Survey.aggregate([
          {
            $unwind: "$items" // Deconstruct the items array
          },
          {
            $unwind: "$items.answer" // Deconstruct the answer array
          },
          {
            $group: {
              _id: {
                question: "$items.question",
                answer: "$items.answer"
              }, // Group by question and individual answer
              count: { $sum: 1 } // Count occurrences of each answer
            }
          },
          {
            $group: {
              _id: "$_id.question", // Group by question
              answers: {
                $push: {
                  answer: "$_id.answer",
                  count: "$count"
                }
              }
            }
          }
        ]);
      
        // Send the aggregated responses as JSON
        res.status(200).json({
          aggregatedResponses: aggregatedResponses
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      
      
}

module.exports.createSurveyRecord = async (req, res) => { 
    try {
        const surveyData = req.body;
    
        // Create an array of survey items based on the request data
        const surveyItems = surveyData.map(item => ({
          question: item.question,
          answer: item.answer,
        }));
    
        // Create a new Survey document with the array of survey items
        const savedSurvey = await Survey.create({ items: surveyItems });
    
        console.log(savedSurvey);
    
        res.status(200).json(savedSurvey);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}