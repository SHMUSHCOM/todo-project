import { updateTodos } from '../../network/requests.js'

export default store => next => async action => {
    if (!['todos/todoAdded', 'todos/todosFetched', 'todos/todoUpdated', 'todos/todoDeleted'].includes(action.type) ) return next(action)
    
    const {todos} = store.getState()
    const response = await updateTodos(JSON.stringify(todos))
    console.log(response)
    next(action)
    
}