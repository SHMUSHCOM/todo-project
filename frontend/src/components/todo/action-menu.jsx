import React from 'react';
import styled from 'styled-components';
import {IconContext} from 'react-icons'
import {FiMoreVertical, FiTrash2, FiCopy} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { todoDeleted } from '../../state/slices/todo.slice';
import { createTodo, useInvalidateTodos } from '../../network/requests';



const ActionsMenu = ({id}) => {
    const dispatch= useDispatch()
    const todo = useSelector( state => state.todos.find( todo => todo?._id == id))
    
    let clonedTodo = {...todo}
    delete clonedTodo?._id

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

`

export default ActionsMenu;
