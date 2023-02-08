import React from 'react';
import styled from 'styled-components';

const TodoHeader = () => {
    return (
        <Styles>
            <div className="todo-header">
                <span>Owner</span>
                <span>Title</span>
                <span>Tags</span>
                <span>Due</span>
                <span>Status</span>
                <span className='points'>Points</span>
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

    .points {
        flex-basis: 0;
        flex-grow: 0;
        padding-right: 40px;

    }
  }


  @media only screen and (max-width: 600px) {
    display: none;
 }
`
export default TodoHeader;
