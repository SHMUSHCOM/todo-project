import { Schema, model } from 'mongoose'

export const ROLES = {
    ADMINISTRATOR: 'ADMINISTRATOR',
    CONTRIBUTOR: 'CONTRIBUTOR'
}

const schema =  new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, require: true,}, 
    password: String,
    role: {type: String,  enum:[ROLES.ADMINISTRATOR, ROLES.CONTRIBUTOR], default: ROLES.CONTRIBUTOR, require: true},
    organization: {type: Schema.Types.ObjectId, ref: 'organization', require: true}
})



export default model('user', schema)