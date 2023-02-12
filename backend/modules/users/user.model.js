import { Schema, model } from 'mongoose'



const schema =  new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, require: true,}, 
    password: String,
    roles: {type: [{type: String,  enum:['ADMINISTRATOR', 'CONTRIBUTOR']}], default: ['CONTRIBUTOR']},
    authenticationMethod: Object,
})



export default model('user', schema)