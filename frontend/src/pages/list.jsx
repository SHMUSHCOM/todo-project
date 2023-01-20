import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { todoAdded } from "../state/slices/todo.slice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/card";
import formatDate from "../utils/date";

const TodoList = () => {
  const dispatch = useDispatch();
  const input = useRef(null);

  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch("http://localhost:1234/songs/");
  //     const data = await response.json();
  //     dispatch(songsChanged(data));
  //   }

  //   getData().catch(console.log);
  // }, []);

  const todos = useSelector(state => state.todos);

  return (
    <Styles>
      <h1>List View | Todo</h1>
      <form>
        <label htmlFor="todo">Todo</label>
        <input type="text" ref={input}></input>
        <button
          type="submit"
          onClick={() => {
            dispatch(todoAdded({ title: input.current.value, due: Date.now() }));
          }}
        >
          Add
        </button>
      </form>
      <div className="container">
        {todos.map((todo, index) => (
          <Card key={index} title={todo.title} subtitle={todo.due}></Card>
        ))}
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  
  form {
    display: flex;
    gap: 5px;
  }

  h1 {
    position: sticky;
    top: 0;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export default TodoList;
