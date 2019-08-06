const  mongoose = require('mongoose')
const validator = require('validator')


const accessIpSchema = new mongoose.Schema({
    ip: {
        type: [String],
        required: true,
        validate(value){
            // if(){return}
            console.log("schema", value[value.length-1])
            if( value.length !== 0 &&  !validator.isIP(value[value.length-1]) ){
                throw new  Error('ip is invalid')
            }
        }
    }
})

const accessIp = mongoose.model('AccessIp',accessIpSchema)

module.exports = accessIp