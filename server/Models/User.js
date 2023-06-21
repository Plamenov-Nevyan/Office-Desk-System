const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    username : {
        type : String,
        required : true, 
        minLength : 3,
        maxLength : 10
    },
    email : {
        type : String,
        required : true, 
        minLength : 4,
        maxLength : 20
    },

    password : {
        type : String,
        required : true, 
        minLength : 6,
    },

    desks : [
        {
            type : Types.ObjectId,
            ref: 'Desk'
        }
    ]
})

const User = model('User', userSchema)

exports.User = User