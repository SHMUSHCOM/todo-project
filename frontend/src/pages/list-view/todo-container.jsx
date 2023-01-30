import React, {useEffect} from 'react';
import styled from 'styled-components';
import TodoItem from "../../components/todo-item";

import { useDispatch, useSelector } from "react-redux";
import { todosFetched } from "../../state/slices/todo.slice";

const TodoContainer = () => {
    const dispatch = useDispatch();
    const filter = useSelector( state => state.app.selectedFilter)
    const todos = useSelector(state => state.todos).filter( todo => {
        if (!filter) return todo
        return todo.status == filter
    } );
  
    useEffect(() => {
      async function getData() {
        const response = await fetch("http://localhost:3033/todos/");
        const data = await response.json();
        dispatch(todosFetched(data));
        console.log('data fetched')
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
