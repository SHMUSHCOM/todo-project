import React from "react"
import styled from "styled-components"
import { IconContext } from "react-icons"
import { FiTrash2, FiCopy } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useCreateTodo, useInvalidateTodos, useDeleteTodo } from "../../network/todo.requests"

const ActionsMenu = ({ id }) => {
  const dispatch = useDispatch()
  const todo = useSelector(state => state.todos.find(todo => todo?._id == id))

  let clonedTodo = { ...todo }
  delete clonedTodo?._id
  const { invalidateTodos } = useInvalidateTodos()

  const createTodo = useCreateTodo()

  const handleCloneClick = async () => {
    await createTodo(clonedTodo)
    invalidateTodos()
  }

  const deleteTodo = useDeleteTodo()
  const handleDeleteClick = async () => {
    await deleteTodo(id)
    invalidateTodos()

  }
  return (
    <Styles className="actions-menu">
      <IconContext.Provider value={{className: "action-icons",style: { verticalAlign: "middle", color: "var(--purple)" },}}>
        <FiTrash2 onClick={handleDeleteClick} />
        <FiCopy onClick={handleCloneClick}></FiCopy>
      </IconContext.Provider>
    </Styles>
  )
}

const Styles = styled.div`
  flex-grow: 0;
  cursor: pointer;
  position: relative;
  overflow: visible;

  display: flex;
  align-items: center;
  gap: 5px;
`

export default ActionsMenu
