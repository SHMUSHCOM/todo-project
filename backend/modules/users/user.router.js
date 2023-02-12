import {Router} from 'express'
import User from './user.model.js'
import { validateAuthentication } from '../../modules/auth/auth.router.js'

const router = new Router()

// CREATE USER

router.post('/', async (request, response, next) => {
    const user = new User(request.body)
    const document = await user.save()
    response.status(200).json(document)

})


// GET USER DATA
router.get('/:id', validateAuthentication, async (request, response, next) => {
    return response.status(200).json({user:request.user})
})

export default router