const {Desk} = require('../Models/Desk')
const {User} = require('../Models/User')

const createDesk = async (deskData, ownerId) => {
try{
        let [newDesk, owner] = await Promise.all([
            Desk.create({...deskData}),
            User.findById(ownerId)
        ])

        newDesk.owner = ownerId
        owner.desks.push(newDesk._id)

        await Promise.all([
            owner.save(),
            newDesk.save()
        ])
        return newDesk
    }catch(err){
        throw {message: err._message}
    }
}

const getDesks = async (ownerId) => {
    try{
        let desks = await Desk.find({owner:ownerId})
        return desks
    }catch(err){
        throw {message: err._message}
    }
}

const deleteDesk = async (deskId, ownerId) => {
    try{
        let [user, _] = await Promise.all([
            User.findOne({_id : ownerId}).populate('desks'),
            Desk.findByIdAndRemove(deskId)
        ])
            user.desks = [...user.desks.filter(desk => desk._id.toString() !== deskId)]
            user.markModified("desks")
            await user.save()
         return user.desks
    }catch(err){
        throw {message: err._message}
    }
}

const updateDesk = async (deskId, ownerId, editValues) => {
    try{
            await Desk.findByIdAndUpdate(deskId, editValues)
            let user = await User.findById(ownerId).populate('desks')    
            return user.desks
       }catch(err){
            throw {message: err._message}
        }
}

module.exports = {
    createDesk,
    getDesks,
    deleteDesk,
    updateDesk
}

