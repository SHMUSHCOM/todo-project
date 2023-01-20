import {model, Schema} from "mongoose";

const todoSchema = new Schema({
    title: {type: String, require: true}, 
    details: String,
    owner: String,
    status: {type: String, enum:['Done', 'In Progress', 'Not Started'], default: 'Not Started'},
    tags: {type: [String]}, 
    due: Date,
    progress: {type: Number, max: 100, min: 0},
}, {timestamps: true})

export default model('todo', todoSchema)