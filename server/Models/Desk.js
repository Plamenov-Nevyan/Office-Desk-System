const { Schema, model, Types, ObjectId } = require("mongoose");

const deskSchema = new Schema({
    name : {
        type : String,
        required : true, 
        minLength : 3,
        maxLength : 10
    },
    symbol : {
        type : String,
        required : true, 
    },
    owner : {
        type : Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

const Desk = model('Desk', deskSchema)

exports.Desk = Desk