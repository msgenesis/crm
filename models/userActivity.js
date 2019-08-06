const  mongoose = require('mongoose')
const validator = require('validator')


const userActivity = new mongoose.Schema({
    location: {
        type: String
    },
    activityDate
})

const UserActivity = mongoose.model('UserActivity', userActivity)

module.exports = UserActivity