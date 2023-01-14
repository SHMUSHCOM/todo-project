import {model, Schema} from "mongoose";

const schema = new Schema({
    name: String,
    album: String, 
    released: Date,
    path: String,
    duration: String,
    label:String,
    artist: {type: Schema.Types.ObjectId, ref: 'artist'},
}, {timestamps: true})

export const Song = model('song', schema)