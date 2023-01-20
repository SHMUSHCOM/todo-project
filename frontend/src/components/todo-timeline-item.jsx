import React from "react";
import styled from 'styled-components'

const TodoTimelineItem = ({type}) => {
  return (
    <Styles>
      <div className={`todo-item ${type}`}>
        <div className={`milestone `} />
        <hgroup>
          <h2>10:00 | Action Item</h2>
          <h3>Details of what needs to be done</h3>
        </hgroup>
      </div>
    </Styles>
  );
};


const Styles = styled.div`
  .todo-item {
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        gap: 15px;
    }

    .past.todo-item {
        color: var(--light-grey);
    }

    .active.todo-item {
        color: var(--purple);
    }

    .milestone {
        width: 15px;
        height: 15px;
        border-radius: 50%;
    }

    .active .milestone {
        background-color: var(--purple);
    }

    .past .milestone {
        background-color: white;
        border: 1px solid var(--light-grey);

    }

    .future .milestone {
        /* background-color: black; */
        border: 1px solid black;
    }

    hgroup{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        
        
    }

    h2, h3 {
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    h3 {
        font-weight: 200;
    }  
`

export default TodoTimelineItem;
