const { Schema } = require('mongoose')

const AnimalSchema = new Schema({
    name: { type:String },
    age: { type:Number },
    type: { type:String },
})

module.exports = AnimalSchema