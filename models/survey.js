const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveyItemSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: [String], required: true },
  });
  
  const surveySchema = new Schema({ items: [surveyItemSchema] });
  
  // Define only the Survey model
  const Survey = mongoose.model('Survey', surveySchema);
  
  module.exports = { Survey };
