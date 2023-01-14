import { response, Router } from "express";
import { Artist } from "./artist.model.js";

const router = Router()


//CREATE
router.post('/', async (request,response) => {
    const artist = new Artist(request.body)
    await artist.save()
    response.status(200).json(artist)
})

//READ
router.get('/:id?',async (request, response) => {
    const {id} = request.params
    let artists = id
        ? await Artist.findById(id).populate('songs')
        : await Artist.find().populate('songs')
    console.log(artists)
    response.status(200).json(artists)
})
 
//REPLACE
router.put('/:id', async (request, response) => {
    const {id} = request.params
    let artist = await Artist.findById(id)
    artist.overwrite(request.body)
    artist = await artist.save()
    response.status(200).json(artist)
})


//UPDATE
router.patch('/:id', async (request, response) => {
    const {id} = request.params
    let artist = await Artist.findById(id)
    artist.set(request.body)
    artist = await artist.save()
    response.status(200).json(artist)
}) 

//DELETE
router.delete('/:id', async(request, response)=> {
    const {id} = request.params
    const artist = await Artist.findByIdAndRemove(id)
    artist 
        ? response.status(200).json({response:"Entity deleted",...artist.toObject()})
        : response.status(200).send("Entity not found")
})
export default router