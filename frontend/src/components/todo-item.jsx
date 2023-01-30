import React from 'react';
import Avatar from './avatar';
import ProgressBar from './progress-bar';
import Tags from './tag'
import Status from './status-item';
import ActionsMenu from './actions-menu';

import styled from 'styled-components'
import formatDate from '../utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { todoSelected } from '../state/slices/app.slice';

const TodoItem = ({ _id, owner, title, status, tags, due, progress }) => {
    const dispatch = useDispatch()
    const isSelected = useSelector( state => state.app.selectedTodo == _id )

    console.log(isSelected)
    return (
        <Styles isSelected={isSelected} onClick={()=> {dispatch(todoSelected(_id))}} >
            <div className='owner'>
                <Avatar/>
                <span>{owner}</span>
            </div>
            <span className='title'>{title}</span>
            <Status status={status}></Status>
            <Tags className='tags' tags={tags}></Tags>
 
            <span> {formatDate(due)}</span>
            <ProgressBar progress={progress}/>
            <ActionsMenu/>

        </Styles>
    );
}

const Styles = styled.div`

    width: 100%;
    height: 70px;
    padding: 15px;
    border: 1px solid var(--very-light-grey);
    border-radius: 5px;

    display: flex;
    justify-content: space-evenly;
    align-items:center;
    gap: 30px;

    font-weight: 100;
    background-color: white;

    & > *:not(.actions-menu) {
        flex-basis: 0;
        flex-grow: 1;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .tags {
        overflow: scroll;
    }
    
    &:hover, &:focus {
        border: 1px solid var(--purple);
        box-shadow:  1px 1px 8px 2px #afafaf39; 
    }

    ${ ({isSelected})=>{
        return isSelected 
            ? `border: 1px solid var(--purple); box-shadow:  1px 1px 8px 2px #afafaf39; `
            : ``
    }}
    

    .owner {
        display: flex;
        align-items: center;
        gap: 10px;

        span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        img {
            max-height: 30px;
        }
    }

`

export default TodoItem;
