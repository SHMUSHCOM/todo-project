import React from 'react';
import styled from 'styled-components';

const TodoHeader = () => {
    return (
        <Styles>
            <div className="todo-header">
                <span>Owner</span>
                <span>Title</span>
                <span>Status</span>
                <span>Tags</span>
                <span>Due</span>
                <span>Progress</span>
            </div>
        </Styles>
    );
}

const Styles = styled.div`
    .todo-header {
    width: 100%;
    padding: 0 15px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 15px;

    color: black;
    font-weight: 100;
    font-size: 14px;
    
    & > * {
      flex-basis: 100px;
      flex-grow: 1;

      padding: 0 10px;

      text-align: start;
    }
  }
`
export default TodoHeader;
