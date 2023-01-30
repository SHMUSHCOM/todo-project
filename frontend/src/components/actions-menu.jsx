import React from 'react';
import styled from 'styled-components';
import {FiMoreVertical} from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { todoDeleted } from '../state/slices/todo.slice';
const ActionsMenu = ({id}) => {
    const dispatch= useDispatch()
    return (
        <Styles className='actions-menu'>
            <FiMoreVertical/>
            <div className="menu">
                <h4>Edit</h4>
                <h4>Complete</h4>
                <h4 onClick={() => dispatch(todoDeleted(id))}>Delete</h4>
                <h4>Move up</h4>
                <h4>Move down</h4>
            </div>
        </Styles>
    );
}


const Styles = styled.div`
    flex-grow: 0;  
    cursor: pointer;
    position: relative;
    overflow: visible;

    .menu {
        display: none;
        flex-direction: column;
        gap: 10px;
        width: 170px;
        padding: 10px;
        background-color: white;
        border: 1px solid var(--very-light-grey);
        border-radius: 5px;
        position: absolute;
        top: 20px;
        left: -160px;
        z-index:99;
        box-shadow: 2px 2px 15px 8px #cbcbcb87;

        h4 {
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: 100;
            font-size: 14px;
        }

        h4:hover {
            background-color: var(--light-purple);
        }
    }

    &:hover > .menu {
        display: flex;
    }
`

export default ActionsMenu;
