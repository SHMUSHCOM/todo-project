import {model, Schema} from "mongoose";

const schema = new Schema({
    name: {type: String, require: true},
    description: String,
    artwork: String,
    songs: {type: [Schema.Types.ObjectId], ref: 'song'},
}, {timestamps:true})

export const Playlist = model('playlist', schema)