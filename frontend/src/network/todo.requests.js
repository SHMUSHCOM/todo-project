import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { todosFetched } from "../state/slices/todo.slice"
import { useNavigate } from "react-router-dom"

const { VITE_SERVER_URL } = import.meta.env

// CUSTOM HOOK | INVALIDATE TODOS
const todoEndpoint = `${VITE_SERVER_URL}/todos`
export const useInvalidateTodos = () => {
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState(null)
  const dispatch = useDispatch()

  const invalidateTodos = async () => {
    const method = "GET"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]
    
    setIsLoading(true)
    const response = await fetch(todoEndpoint, { method, headers })
    const data = await response.json()
    setData(data)
    setIsLoading(false)
    
    if (response.ok) dispatch(todosFetched(data))
    if (!response.ok) {
      setIsError(true)
      navigate('/auth/login')
    }
  }

  return { invalidateTodos, data, isError, isLoading }
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


