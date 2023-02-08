import React from 'react';
import styled from 'styled-components';
import TodoItem from "../../components/todo/todo-item";

import { useSelector, useDispatch } from "react-redux";
import { todoSelected } from '../../state/slices/app.slice';
import { useInvalidateTodos } from '../../network/requests';

const TodoContainer = () => {

    const invalidateTodos = useInvalidateTodos()
    const statusFilter = useSelector( state => state.app.statusFilter)
    const searchFilter = useSelector( state => state.app.searchFilter)
    const selectedTodo = useSelector( state => state.app.selectedTodo)

    const todos = useSelector(state => state.todos).filter( todo => {
        if (!statusFilter && !searchFilter) return true
        if (!statusFilter) return (JSON.stringify(todo).toLowerCase().includes(searchFilter.toLowerCase()))
        if (!searchFilter) return (todo.status == statusFilter )
        return ((todo.status == statusFilter ) && (JSON.stringify(todo).toLowerCase().includes(searchFilter.toLowerCase())))
    } );
    const sortedTodos = todos.sort( (todoA, todoB) => todoA.createdAt > todoB.createdAt ? -1 : 1 )
    
    const dispatch = useDispatch()
    if (!sortedTodos.find( todo => todo._id == selectedTodo)) dispatch(todoSelected(sortedTodos[0]?._id))

   
    return (
        <Styles>
            <div className="todo-container">
                {sortedTodos.map((todo) => (<TodoItem key={todo?._id} {...todo}></TodoItem>))}
            </div>
        </Styles>
    );
}

const Styles = styled.div`
    position: relative;
    overflow: scroll;

    .todo-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`
export default TodoContainer;
