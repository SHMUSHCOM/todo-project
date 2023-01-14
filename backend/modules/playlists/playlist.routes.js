import { Router } from "express";
import { Playlist } from "./playlist.model.js";

const router = Router()


//CREATE
router.post('/', async (request,response) => {
    const playlist = new Playlist(request.body)
    await playlist.save()
    response.status(200).json(playlist)
})

//READ
router.get('/:id?',async (request, response) => {
    const {id} = request.params
    let playlists = id
        ? await Playlist.findById(id).populate('songs')
        : await Playlist.find().populate('songs')
    response.status(200).json(playlists)
})

//REPLACE
router.put('/:id', async (request, response, next) => {
    try {
        const {id} = request.params
        let playlist = await Playlist.findById(id)
        playlist.overwrite(request.body)
        playlist = await playlist.save()
        response.status(200).json(playlist)
    } catch (error) {
        next(error)
    }
})


//UPDATE
router.patch('/:id', async (request, response) => {
    const {id} = request.params
    let playlist = await Playlist.findById(id)
    playlist.set(request.body)
    playlist = await playlist.save()
    response.status(200).json(playlist)
})

//DELETE
router.delete('/:id', async(request, response)=> {
    const {id} = request.params
    const playlist = await Playlist.findByIdAndRemove(id)
    playlist 
        ? response.status(200).json({response:"Entity deleted",...playlist.toObject()})
        : response.status(200).send("Entity not found")
})
export default router