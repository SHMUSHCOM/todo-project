import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { todosFetched } from "../state/slices/todo.slice"
import { usersFetched } from "../state/slices/user.slice"
import { userUpdated } from "../state/slices/app.slice"
import { useNavigate } from "react-router-dom"
const { VITE_SERVER_URL } = import.meta.env

const todoEndpoint = `${VITE_SERVER_URL}/todos`
// FETCH TODOS
const fetchTodos = async accessToken => {
  const method = "GET"
  const headers = [
    ["content-type", "application/json"],
    ["access-token", accessToken],
  ]
  const response = await fetch(todoEndpoint, { method, headers })
  const data = await response.json()
  return {data, success: response.ok}
}

// CUSTOM HOOK | INVALIDATE TODOS
export const useInvalidateTodos = () => {
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  
  const invalidateTodos = async () => {
    setIsLoading(true)
    const {data, success} = await fetchTodos(accessToken)
    if (success) dispatch(todosFetched(data))
    setIsLoading(false)
    if (!success) navigate('/auth/login')
  }
  
  return { invalidateTodos, isLoading }
}

// SYNC TODOS FROM CLIENT TO SERVER
const syncEndpoint = `${VITE_SERVER_URL}/todos/sync`
export const useSyncTodos = (todos, accessToken)=>{
  return async () => {

    const method = "POST"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]
    const body = todos
    const response = await fetch(syncEndpoint, { method, headers, body })
    const data = await response.json()
  
    return {data}
  }
}

// CREATE TODO
export const useCreateTodo = ()=>{
  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  return async todo => {
    const method = "POST"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]
    const body = JSON.stringify([todo])
    
    setIsLoading(true)
    const response = await fetch(todoEndpoint, { method, headers, body })
    const data = await response.json()
    setIsLoading(false)
    setIsError(!response.ok) 

    return {data, isError, isLoading}
  }
}


// UPDATE TODO
export const useUpdateTodo = ()=> {

  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  
  return async todo => {
    const method = "PATCH"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]
    const body = JSON.stringify(todo)
    const path = todoEndpoint + `/${todo._id}`

    setIsLoading(true)
    const response = await fetch(path, { method, headers, body })
    const data = await response.json()
    setIsLoading(false)
    setIsError(!response.ok) 

    return {data, isError, isLoading}
  }
}




// DELETE TODO
export const useDeleteTodo = ()=> {
  
  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  return async todoId => {
    const method = "DELETE"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]
    
    const path = todoEndpoint + `/${todoId}`

    setIsLoading(true)
    const response = await fetch(path, { method, headers })
    const data = await response.json()
    setIsLoading(false)
    setIsError(!response.ok) 

    return {data, isError, isLoading}
  }
}

