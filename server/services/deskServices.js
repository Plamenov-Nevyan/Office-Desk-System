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

module.exports = {
    createDesk,
    getDesks
}

