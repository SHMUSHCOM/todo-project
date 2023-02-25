import { Router } from "express";
import Todo from './todo.model.js'
import { authorize } from "../auth/auth.router.js";
import { ROLES } from "../users/user.model.js";

const router = new Router()

// CREATE TODOS
router.post('/', async (request, response, next) => {
    const todos = request.body.map( todo => ({creator: request.user.id,...todo}))
    const documents = await Todo.create(...todos)
    response.status(200).json(documents)
})

// READ TODO BY USER
router.get('/user/', async (request, response, next) => {
    const {id} = request.user
    const documents = await Todo.where('owner').equals(id)
    response.status(200).json(documents)
})

// READ ALL TODOS
router.get('/', async (request, response, next) => {
    const {role, id, organization} = request.user
    
    // RETURN TODOS OWNED BY CONTRIBUTOR AND WITHIN ORG
    let documents = null
    if (role == ROLES.ADMINISTRATOR) documents = await Todo.find().populate('owner').lean()
    if (role == ROLES.CONTRIBUTOR) documents = await Todo.where('owner').equals(id).populate('owner').lean()
    const todos = documents.filter( todo => String(todo.owner.organization) == organization)

    response.status(200).json(todos)
})
 
// READ ONE TODO
router.get('/:id', async (request, response, next) => {
    const {id} = request.params
    const document = await Todo.findById(id)
    response.status(200).json(document)
})

//REPLACE
router.put('/:id', async (request, response) => {
    const {id} = request.params
    const todo = await Todo.findById(id)
    todo.overwrite(request.body)
    const document = await todo.save()
    response.status(200).json(document)
})

//UPDATE
router.patch('/:id', async (request, response) => {
    const {id} = request.params
    const todo = await Todo.findById(id)
    todo.set(request.body)
    const document = await todo.save()
    response.status(200).json(document)
})

//DELETE
router.delete('/:id', async(request, response)=> {
    const {id} = request.params
    const document = await Todo.findByIdAndRemove(id)
    
    document 
        ? response.status(200).json({response:"Entity deleted",...document.toObject()})
        : response.status(200).send("Entity not found")
})

 
export default router