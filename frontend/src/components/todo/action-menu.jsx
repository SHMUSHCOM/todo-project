import React from "react"
import styled from "styled-components"

import { IconContext } from "react-icons"
import { FiTrash2, FiCopy } from "react-icons/fi"

import { useSelector } from "react-redux"
import { useCreateTodo, useInvalidateTodos, useDeleteTodo } from "../../network/todo.requests"

const ActionsMenu = ({ id }) => {
  const { invalidateTodos } = useInvalidateTodos()
  const todo = useSelector(state => state.todos.find(todo => todo?._id == id))

  // CREATE CLONED TODO
  const createTodo = useCreateTodo()
  const handleCloneClick = async () => {
    const clonedTodo = { ...todo }
    delete clonedTodo?._id

    await createTodo(clonedTodo)
    invalidateTodos()
  }

  // DELETE TODO
  const deleteTodo = useDeleteTodo()
  const handleDeleteClick = async () => {
    await deleteTodo(id)
    invalidateTodos()
  }

  const customStyles = { className: "action-icons", style: { verticalAlign: "middle", color: "var(--purple)" } }

  return (
    <Styles className="actions-menu">
      <IconContext.Provider value={customStyles}>
        <FiTrash2 onClick={handleDeleteClick} />
        <FiCopy onClick={handleCloneClick}></FiCopy>
      </IconContext.Provider>
    </Styles>
  )
}

const Styles = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  cursor: pointer;
`

export default ActionsMenu
