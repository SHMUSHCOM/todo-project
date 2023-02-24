import {Router} from 'express'
import User from './user.model.js'
import { authenticate } from '../../modules/auth/auth.router.js'

const router = new Router()

// CREATE USER
router.post('/', async (request, response, next) => {
    const documents = await User.create(...request.body)
    response.status(200).json(documents)

})

// GET USER 
router.get('/self', async (request, response, next) => {
    const {id} = request.user
    const user = await User.findById(id)
    return response.status(200).json(user)
})

// GET USERS
router.get('/', async (request, response, next) => {
    const {organization} = request.user
    const documents = await User.where('organization').equals(organization).populate('organization')
    response.status(200).json(documents)
})


// UPDATE USER
router.patch('/:id', async (request, response, next) => {
    const {id} = request.params
    const user = await User.findById(id)
    user.set(request.body)
    const document = await user.save()
    response.status(200).json(document)
})

// REPLACE USER
router.put('/:id', async (request, response, next) => {
    const {id} = request.params
    const user = await User.findById(id)
    user.overwrite(request.body)
    console.log(user.toObject())
    const document = await user.save()
    response.status(200).json(document)
})

export default router