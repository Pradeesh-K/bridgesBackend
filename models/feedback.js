const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name:{
        type:String,
    },
    comments:{
        type:String,
    },
    GUID:{
        type:String,
    },
    cameraPosition:{
        type: Array
    }, 
    targetPosition:{
        type: Array
    }, 
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    lastSelection: {
        type: Object
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema);
