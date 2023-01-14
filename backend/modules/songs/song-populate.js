
import connect from "../../database/config.js"
import { Song } from "./song.model.js"
import { Artist } from "../artists/artist.model.js"

await connect('mongodb://localhost:27017/spotify')
const artists = await Artist.find()
const songs = await Song.find()
songs.forEach(song=> {
    const index = Math.floor((Math.random() * (artists.length)))
    const {id} = artists[index]
    song.artist = id
    song.save()
})





