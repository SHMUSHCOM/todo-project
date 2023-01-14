
import connect, {disconnect} from "../../database/config.js"
import { Song } from "../songs/song.model.js"
import { Playlist } from "./playlist.model.js"

await connect('mongodb://localhost:27017/spotify')
const playlists = await Playlist.find({})
const songs = await Song.find({})
playlists.forEach(async playlist=> {
    const index = Math.floor((Math.random() * (songs.length)))

    const {id:id1} = songs[index]
    const {id:id2} = songs[Math.min(index+1,songs.length -1)]
    const {id:id3} = songs[Math.max(index-1,0)]

    playlist.songs=[id1,id2,id3] 
    playlist.save()
    
})