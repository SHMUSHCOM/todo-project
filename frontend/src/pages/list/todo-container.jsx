import React, {useEffect} from 'react';
import styled from 'styled-components';
import TodoItem from "../../components/todo/todo-item";

import { useDispatch, useSelector } from "react-redux";
import { todosFetched } from "../../state/slices/todo.slice";

const TodoContainer = () => {
    const dispatch = useDispatch();
    const statusFilter = useSelector( state => state.app.statusFilter)
    const searchFilter = useSelector( state => state.app.searchFilter)

    const todos = useSelector(state => state.todos).filter( todo => {
        if (!statusFilter && !searchFilter) return true
        if (!statusFilter) return (JSON.stringify(todo).toLowerCase().includes(searchFilter.toLowerCase()))
        if (!searchFilter) return (todo.status == statusFilter )
        return ((todo.status == statusFilter ) && (JSON.stringify(todo).toLowerCase().includes(searchFilter.toLowerCase())))

    } );
  
    useEffect(() => {
      async function getData() {
        const response = await fetch("http://localhost:3033/todos/");
        const data = await response.json();
        dispatch(todosFetched(data));
        
      }
      getData().catch(console.log)
    }, []);

    return (
        <Styles>
            <div className="todo-container">
                {todos.map((todo) => (<TodoItem key={todo._id} {...todo}></TodoItem>))}
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
