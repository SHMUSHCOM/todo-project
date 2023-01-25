import React, {useEffect} from 'react';
import styled from 'styled-components';
import TodoItem from "../../components/todo-item";

import { useDispatch, useSelector } from "react-redux";
import { todosFetched } from "../../state/slices/todo.slice";

const TodoContainer = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
  
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
        border-top: 1px solid var(--very-light-grey);
        border-radius: 5px;

        & > :first-child{
        border-top: 0px;
        }

        
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`
export default TodoContainer;
