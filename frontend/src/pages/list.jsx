import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { todoAdded, todosFetched } from "../state/slices/todo.slice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/card";
import Filters from '../components/filters'


const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

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
      <Filters className="filters"/>
      <div className="todo-header">
        <span>Owner</span>
        <span>Title</span>
        <span>Status</span>
        <span>Tags</span>
        <span>Due</span>
        <span>Progress</span>
      </div>
      <div className="todo-container">
        {todos.map((todo) => (<Card key={todo._id} {...todo}></Card>))}
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  min-width: 1000px;
  width: 100%;
  height: calc(100vh - var(--header-height));
  padding: 20px;
  position: relative;
  
  display: flex;
  flex-direction: column;
  gap: 20px;

  .todo-header {
    width: 100%;
    padding: 0 15px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 15px;

    color: black;
    font-weight: 100;
    font-size: 14px;
    
    & > * {
      flex-basis: 100px;
      flex-grow: 1;

      padding: 0 10px;

      text-align: start;
    }
  }

  .todo-container {
    border-top: 1px solid var(--very-light-grey);
    border-radius: 5px;

    & > :first-child{
      border-top: 0px;
    }

    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export default TodoList;
