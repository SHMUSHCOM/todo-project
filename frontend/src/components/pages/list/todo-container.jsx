import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from "../../todo/todo-item";
import Loader from "../../loader"

import { useSelector, useDispatch } from "react-redux";
import { todoSelected } from '../../../state/slices/app.slice';
import { useInvalidateTodos, getProtectedUserData } from '../../../network/requests';

const TodoContainer = () => {

    // TESTING ACCESS TOKEN
    const accessToken = useSelector(state => state.app.accessToken)
    useEffect(()=>{
        (async function(){
            const user = await getProtectedUserData(accessToken)
            console.log({protected:user})
        })()
    },[])

    // REFRESH CACHE ON MOUNT
    const {invalidateTodos, isLoading} = useInvalidateTodos()
    useEffect(()=>{
        invalidateTodos()
    } ,[])

    // GET APP STATE
    const statusFilter = useSelector( state => state.app.statusFilter)
    const searchFilter = useSelector( state => state.app.searchFilter)
    const selectedTodo = useSelector( state => state.app.selectedTodo)
    const sortColumn = useSelector( state => state.app.sortColumn)
    const sortOrder = useSelector( state => state.app.sortOrder)

    // GET FILTERED TODOS
    const todos = useSelector(state => state.todos).filter( todo => {
        if (!statusFilter && !searchFilter?.trim()) return true
        if (!statusFilter) return (JSON.stringify(todo).toLowerCase().includes(searchFilter?.trim().toLowerCase()))
        if (!searchFilter) return (todo.status == statusFilter )
        return ((todo.status == statusFilter ) && (JSON.stringify(todo).toLowerCase().includes(searchFilter?.trim().toLowerCase())))
    } );

    // GET SORTED TODOS
    const sortedTodos = todos.sort( (todoA, todoB) => todoA[sortColumn || 'createdAt'] > todoB[sortColumn || 'createdAt'] ? -sortOrder : sortOrder)
    const selectedTodoIsVisible = !!sortedTodos.find( todo => todo._id == selectedTodo)

    // SELECT FIRST TODO (IF SELECTED TODO HAS BEEN FILTERED OUT)
    const dispatch = useDispatch()
    useEffect( ()=>{
        if (!selectedTodoIsVisible || !selectedTodo) dispatch(todoSelected(sortedTodos[0]?._id))
    },[statusFilter, searchFilter])

    return (
        <Styles>{
            isLoading
                ? <Loader></Loader>
                : <div className="todo-container">{todos.map((todo) => (<TodoItem key={todo?._id} {...todo}></TodoItem>))}</div>
            }
            
        </Styles>
    );
}

const Styles = styled.div`
    height: 100%;
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
