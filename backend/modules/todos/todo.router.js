import { Router } from "express";
import Todo from './todo.model.js'



const router = new Router()

// CREATE TODO (MULTIPLE)
router.post('/', async (request, response, next) => {

    const documents = await Todo.create(...request.body)
    response.status(200).json(documents)
})

router.post('/upsert', async (request, response, next) => {
    
    const clientStorage = [...request.body]
    const serverStorage = await Todo.find()

    console.log({clientStorage})
    console.log({serverStorage})

    // TODO - SYNC CLIENT STORAGE WITH SERVER STORAGE
    // HANDLE CASE OR CREATE / UPDATE / DELETE

    // [{id:1, name:"adam"},{id:2, name:"hana"},{id:3, name:"libby"},{id:4, name:"jonny"}]
    // [{id:1, name:"adam walker"},{id:3, name:"libby walker"},{id:4, name:"jonny"}, {id:5, name:"jonny"}]

    response.status(200).json({message: "success"})
})

// READ ALL TODOS
router.get('/', async (request, response, next) => {
    const collection = await Todo.find()
    response.status(200).json(collection)
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