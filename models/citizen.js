const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')


const citizenSchema = new Schema({

    phoneNumber:{
        type: String,
        required: [true, 'Phone Number cannot be blank'],
        unique:true
    },
    reviews:[{
      type:Schema.Types.ObjectId,
      ref:'Review'
  }],
  liked:[{
    type:Schema.Types.ObjectId,
    ref:'Bridge'
}],



})

// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };




module.exports = mongoose.model('User', citizenSchema);