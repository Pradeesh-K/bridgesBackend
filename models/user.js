const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({

    email:{
        type: String,
        required: [true, 'Username cannot be blank'],
        unique:true
    },
    salt: String, // Add salt field
  hash: String, // Add hash field

})

// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

userSchema.plugin(passportLocalMongoose);   // this is going to add username and password to our schema


module.exports = mongoose.model('User', userSchema);