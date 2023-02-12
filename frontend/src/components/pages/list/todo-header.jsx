import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortColumnUpdated, sortOrderUpdated } from '../../../state/slices/app.slice'

import styled from 'styled-components';

const TodoHeader = () => {
    const header = useRef(null)
    const dispatch = useDispatch()
    const sortColumn = useSelector( state => state.app.sortColumn)

    const sortHandler = (event) => {
        if(event.target.tagName == 'SPAN' ) {
            dispatch(sortColumnUpdated(event.target.textContent.toLowerCase().trim()))
            dispatch(sortOrderUpdated())
        }  
    }

    return (
        <Styles>
            <div className="todo-header" ref={header} onClick={sortHandler}>
                <span tabIndex={0} className={sortColumn == 'owner' ? 'selected' : ''}>Owner</span>
                <span tabIndex={0} className={sortColumn == 'title' ? 'selected' : ''}>Title</span>
                <span tabIndex={0} className={sortColumn == 'tags' ? 'selected' : ''}>Tags</span>
                <span tabIndex={0} className={sortColumn == 'due' ? 'selected' : ''}>Due</span>
                <span tabIndex={0} className={sortColumn == 'status' ? 'selected' : ''}>Status</span>
                <span tabIndex={0} className={sortColumn == 'points' ? 'selected points' : 'points'}>Points</span>
                <span tabIndex={0} className={sortColumn == 'progress' ? 'selected' : ''}>Progress</span>
            </div>
        </Styles>
    );
}

const Styles = styled.div`
    .todo-header {
    width: 100%;
    height: 20px;
    padding: 0 15px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 15px;

    color: black;
    font-weight: 100;
    font-size: 14px;
    
    cursor: pointer;
    user-select: none;
    
    span {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    & span::after{
        content: '↓↑';
        visibility: hidden;

    }

    & span.selected::after {
        visibility: visible;
    }

    & span:hover::after{
        visibility: visible;

    }



    & > * {
      flex-basis: 0;
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
