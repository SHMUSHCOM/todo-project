import { Router } from "express";
import { Song } from "./song.model.js";
import errorHandler from "../../error-handler.js";

const router = Router()


//CREATE
router.post('/', errorHandler(async (request,response) => {
    const song = new Song(request.body)
    await song.save()
    if (request.body.error) throw new Error(request.body.error)
    response.status(200).json(song)
}))

//READ
router.get('/:id?',async (request, response) => {
    const {id} = request.params
    const songs = id
        ? await Song.findById(id).populate('artist')
        : await Song.find().populate('artist')
    response.status(200).json(songs)
})

//REPLACE
router.put('/:id', async (request, response) => {
    const {id} = request.params
    let song = await Song.findById(id)
    song.overwrite(request.body)
    song = await song.save()
    response.status(200).json(song)
})


//UPDATE
router.patch('/:id', async (request, response) => {
    const {id} = request.params
    let song = await Song.findById(id)
    song.set(request.body)
    song = await song.save()
    response.status(200).json(song)
})

//DELETE
router.delete('/:id', async(request, response)=> {
    const {id} = request.params
    const song = await Song.findByIdAndRemove(id)
    song 
        ? response.status(200).json({response:"Entity deleted",...song.toObject()})
        : response.status(200).send("Entity not found")
})
export default router