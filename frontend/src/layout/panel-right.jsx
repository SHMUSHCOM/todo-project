import React from "react"
import styled from "styled-components"
import TodoForm from "../components/todo/form"

const RightPanel = () => {
  
  return (
    <Styles className="panel">
      <TodoForm/>
    </Styles>
  );
};

const Styles = styled.div`
  min-width: 400px;
  height: 100%;
  padding: 20px;
  padding-top: 20px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-left: 1px solid #cccccc;
  background-color: white;

  & > * {
    flex-grow: 1;
  }

  @media only screen and (max-width: 600px) {
      position: absolute;
      bottom:0; left: 0; right: 0;
      height: 400px;
      border-top: 1px solid var(--very-light-grey);
      box-shadow: 0 2px 5px 5px #8383832f;

  }
`

export default RightPanel
