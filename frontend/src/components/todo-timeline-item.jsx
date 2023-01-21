import React from "react";
import styled from 'styled-components'
import {formatTime} from '../utils/date'

const TodoTimelineItem = ({type, title, due, details}) => {
  return (
    <Styles>
      <div className={`todo-item ${type}`}>
        <div className={`milestone `} />
        <hgroup>
          <h2>{formatTime(due)} | {title}</h2>
          <h3>{details}</h3>
        </hgroup>
      </div>
    </Styles>
  );
};


const Styles = styled.div`
  .todo-item {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .past.todo-item {
        color: var(--light-grey);
    }

    .active.todo-item {
        color: var(--purple);
    }

    .milestone {
        min-width: 15px;
        min-height: 15px;
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
