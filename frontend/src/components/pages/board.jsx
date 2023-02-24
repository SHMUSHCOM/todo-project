import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

const Board = () => {
  const users = useSelector(state => state.users)

  return (
    <Styles>
      <ul>
        {users.map(user => (
          <li>
            {`${user.firstName} ${user.lastName}: `}
            <b>{user.role}</b>
          </li>
        ))}
      </ul>
    </Styles>
  )
}

const Styles = styled.div`
  padding: 20px;
`

export default Board
