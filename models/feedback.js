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
    targetPosition:{
        type: Array
    }, 
    cameraPosition:{
        type: Array
    }, 

    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    lastSelection: {
        type: Object
    }, 
    element: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema);
