import {model, Schema} from "mongoose";

const schema = new Schema({
    firstName: String,
    lastName: String,
    profileImage: String,
    bio:String,
    genre: String,
    country:String,
    dateOfBirth: Date,
    gender: String,
    songs: {type: [Schema.Types.ObjectId], ref: 'song'},
}, {timestamps:true})

export const Artist = model('artist', schema)