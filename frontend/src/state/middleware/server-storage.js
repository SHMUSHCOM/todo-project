import { useSyncTodos } from '../../network/requests.js'

export default store => next => async action => {
    if (!['todos/todoCreated', 'todos/todoUpdated', 'todos/todoDeleted'].includes(action.type) ) return next(action)
    
    next(action)
    const {todos, app: {accessToken}} = store.getState()
    const syncTodos = useSyncTodos(JSON.stringify(todos), accessToken)
    await syncTodos()
}

