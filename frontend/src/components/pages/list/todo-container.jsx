import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from "../../../components/todo/todo-item";

import { useSelector, useDispatch } from "react-redux";
import { todoSelected } from '../../../state/slices/app.slice';
import { useInvalidateTodos, getProtectedUserData } from '../../../network/requests';

const TodoContainer = () => {
    const accessToken = useSelector(state => state.app.accessToken)
    useEffect(()=>{
        (async function(){
            const user = await getProtectedUserData(accessToken)
            console.log(user)
        })()
    },[])

    // Refresh the cache on component render
    useInvalidateTodos()

    // Get app state
    const statusFilter = useSelector( state => state.app.statusFilter)
    const searchFilter = useSelector( state => state.app.searchFilter)
    const selectedTodo = useSelector( state => state.app.selectedTodo)
    const sortColumn = useSelector( state => state.app.sortColumn)
    const sortOrder = useSelector( state => state.app.sortOrder)

    // Return filtered todos
    const todos = useSelector(state => state.todos).filter( todo => {
        if (!statusFilter && !searchFilter?.trim()) return true
        if (!statusFilter) return (JSON.stringify(todo).toLowerCase().includes(searchFilter?.trim().toLowerCase()))
        if (!searchFilter) return (todo.status == statusFilter )
        return ((todo.status == statusFilter ) && (JSON.stringify(todo).toLowerCase().includes(searchFilter?.trim().toLowerCase())))
    } );

    // Return sorted todos
    const sortedTodos = todos.sort( (todoA, todoB) => todoA[sortColumn || 'createdAt'] > todoB[sortColumn || 'createdAt'] ? -sortOrder : sortOrder)
    
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

    @media only screen and (max-width: 600px) {
      
  }

`
export default TodoContainer;