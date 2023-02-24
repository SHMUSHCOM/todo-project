import {Router} from 'express'
import Organization from './organization.model.js'

const router = new Router()

// CREATE NEW ORGANIZATION
router.post('/', async (request, response, next) => {
    const documents = await Organization.create(...request.body)
    response.status(200).json(documents)
})

// GET ORGANIZATIONS
router.get('/', async (request, response, next) => {
    const organizations = await Organization.find()
    response.status(200).json(organizations)
} )


export default router