import { Router } from "express";
import Todo from './todo.model.js'
import { authorize } from "../auth/auth.router.js";
import { ROLES } from "../users/user.model.js";

const router = new Router()

// SYNC CLIENT UPDATES WITH SERVER
router.post('/sync', async (request, response, next) => {
    
    const clientStorage = [...request.body]
    const serverStorage = await Todo.find()

    const clientStorageIds = clientStorage.map(todo => todo?._id)
    const serverStorageIds = serverStorage.map(todo => todo?._id?.toString())

 
    function toServerTodo(clientTodo){
        const serverTodo = {...clientTodo}
        delete serverTodo?._id
        return serverTodo
    }

    // Files on the server that are not on the client should be deleted. 
     for (let serverTodoId of serverStorageIds) {
        if (!clientStorageIds.includes(serverTodoId)) {
            const deleted = await Todo.findByIdAndDelete(serverTodoId)
        }
     }

     // Files that are on the server and the client should be updated
     for(let clientTodo of clientStorage) {
        if(serverStorageIds.includes(clientTodo?._id)) {
            const updated = await Todo.findByIdAndUpdate(clientTodo?._id ,clientTodo, {new: true})
        }
     }

     // Files that on the client, but not on the server should be created. 
     for(let clientTodo of clientStorage) {
        if(!serverStorageIds.includes(clientTodo?._id)) {
            const created = await Todo.create(toServerTodo(clientTodo), {new: true})
        }
     }
    
    response.status(200).json({message: "success"})
})

// CREATE TODO (MULTIPLE)
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
    let documents = null
    
    // ***** OPEN ITEM - NEED TO FILTER OUT THE TODOS THAT ARE NOT PART OF THE ORGANIZATION
    if (role == ROLES.ADMINISTRATOR) documents = await Todo.find().populate('owner').lean()
    if (role == ROLES.CONTRIBUTOR) documents = await Todo.where('owner').equals(id).populate('owner').lean()
    

    const filteredDocuments = documents.filter( todo => String(todo.owner.organization) == organization)
    response.status(200).json(filteredDocuments)
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