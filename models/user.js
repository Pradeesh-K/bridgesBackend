const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({

    name:{
        type: String
    },
    ip:{
        type: String
    }
    
})

// userSchema.plugin(passportLocalMongoose);   // this is going to add username and password to our schema


module.exports = mongoose.model('User', userSchema);