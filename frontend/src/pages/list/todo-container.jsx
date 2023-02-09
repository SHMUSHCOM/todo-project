import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from "../../components/todo/todo-item";

import { useSelector, useDispatch } from "react-redux";
import { todoSelected } from '../../state/slices/app.slice';
import { useInvalidateTodos } from '../../network/requests';

const TodoContainer = () => {

    // Refresh the cache on component render
    useInvalidateTodos()

    // Get app state
    const statusFilter = useSelector( state => state.app.statusFilter)
    const searchFilter = useSelector( state => state.app.searchFilter)
    const selectedTodo = useSelector( state => state.app.selectedTodo)

    // Return filtered todos
    const todos = useSelector(state => state.todos).filter( todo => {
        if (!statusFilter && !searchFilter?.trim()) return true
        if (!statusFilter) return (JSON.stringify(todo).toLowerCase().includes(searchFilter?.trim().toLowerCase()))
        if (!searchFilter) return (todo.status == statusFilter )
        return ((todo.status == statusFilter ) && (JSON.stringify(todo).toLowerCase().includes(searchFilter?.trim().toLowerCase())))
    } );

    // Return sorted todos
    const sortedTodos = todos.sort( (todoA, todoB) => todoA.createdAt > todoB.createdAt ? -1 : 1 )
    
    // Select first todo (if none selected)
    const dispatch = useDispatch()
    useEffect( ()=>{
        if (!sortedTodos.find( todo => todo._id == selectedTodo)) dispatch(todoSelected(sortedTodos[0]?._id))
    },[todos])

    return (
        <Styles>
            <div className="todo-container">
                {todos.map((todo) => (<TodoItem key={todo?._id} {...todo}></TodoItem>))}
            </div>
        </Styles>
    );
}

const Styles = styled.div`
    position: relative;
    overflow: scroll;

    .todo-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`
export default TodoContainer;
