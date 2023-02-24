import {Schema, model} from 'mongoose'


const schema = new Schema({
    name: String,
    domain: String
})


export default model('organization', schema)