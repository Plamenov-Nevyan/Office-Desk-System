const {User} = require('../Models/User.js')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const constants = require('../config/constants.js')

const registerUser = async (userData, constants) => {
    let userExisting = await checkIfUserExists(userData.email)
    if(!userExisting) {
        try{
            let hash = await bcryptjs.hash(userData.password, constants.SALT_ROUNDS)
            userData.password = hash
            let newUser = await User.create({
                ...userData
            })
            return createSession(newUser.username, newUser.email, newUser._id)

        }catch(err){
            let errMessages = handleValidationError(err)
                throw {messages: errMessages}
        }
    }else {
    throw {message : 'Email is not available!'}
    }
}

 const loginUser = async (userData) => {
    let user = await User.findOne({email: userData.email})

    if(user){
        try{
            let isPassCorrect = await bcryptjs.compare(userData.password, user.password)
            if(isPassCorrect){
            return createSession(user.username, user.email, user._id)

            }else {
                throw {message : 'Email and/or password is incorrect!'}
            }
      }catch(err){
        throw{message : err._message}
      }
    }else {
        throw {message : 'Email and/or password is incorrect!'}
    }
}

const getUsers = async () => {
    try{
        let users = await User.find({}).populate('desks')
        return users
    }catch(err){
        throw {message: err._message}
    }
}


const checkIfUserExists = (email) => User.exists({email}).exec() 


 const createSession = (
        username, 
        email,
        id
    ) => {
    const payload = {
        username,
        email,
        id
    }
    let accessToken = jsonwebtoken.sign(payload, constants.JWT_SECRET)
    return {
        username, 
        email,
        id,
        accessToken
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers
}

function handleValidationError(err){
    const messages = []
    for (let field in err.errors) {
      messages.push(err.errors[field].message)
      console.log(err.errors[field].message)
    }
    return messages
  }
  