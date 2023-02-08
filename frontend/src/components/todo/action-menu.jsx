import React from 'react';
import styled from 'styled-components';
import {IconContext} from 'react-icons'
import {FiMoreVertical, FiTrash2, FiCopy} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { todoDeleted } from '../../state/slices/todo.slice';
import { createTodo, useInvalidateTodos } from '../../network/requests';



const ActionsMenu = ({id}) => {
    const dispatch= useDispatch()
    const todo = useSelector( state => state.todos.find( todo => todo._id == id))
    
    let clonedTodo = {...todo}
    delete clonedTodo._id

    const invalidate = useInvalidateTodos()

    return (
        <Styles className='actions-menu'>
            <IconContext.Provider value={{ className: 'action-icons', style: { verticalAlign: 'middle', color: 'var(--purple)' } }}>
                <FiTrash2 onClick={() => dispatch(todoDeleted(id))}/>
                <FiCopy onClick={ () => {
                    createTodo(clonedTodo) 
                    invalidate()
                }}>
                </FiCopy>
            </IconContext.Provider>
        </Styles>
    );
}


const Styles = styled.div`

  
    flex-grow: 0;  
    cursor: pointer;
    position: relative;
    overflow: visible;
    
    display: flex;
    align-items: center;
    gap: 5px;

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
