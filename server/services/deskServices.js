const {Desk} = require('../Models/Desk')
const {User} = require('../Models/User')

const createDesk = async (deskData, ownerId) => {
    console.log(deskData)
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
}

const getDesks = async (ownerId) => {
    let desks = await Desk.find({owner:ownerId})
    return desks
}

const deleteDesk = async (deskId, ownerId) => {
    try{
 let [user, _] = await Promise.all([
    User.findOne({_id : ownerId}).populate('desks'),
    Desk.findByIdAndRemove(deskId)
 ])
 console.log(user)
     user.desks = [...user.desks.filter(desk => desk._id.toString() !== deskId)]
     user.markModified("desks")
    await user.save()
    return user.desks
    }catch(err){
    }
}

module.exports = {
    createDesk,
    getDesks,
    deleteDesk
}

