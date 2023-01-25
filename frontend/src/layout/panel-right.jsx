import React, {useState} from "react";
import styled from "styled-components";


import TimelineContainer from '../components/timeline-container'
import StatusSelect from "../components/status-select";
import TodoForm from "../components/todo-form";

const RightPanel = () => {
  
  return (
    <Styles className="panel">
      <TodoForm>

      </TodoForm>
    </Styles>
  );
};

const Styles = styled.div`
  min-width: 400px;
  min-height: 100%;
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

`;

export default RightPanel;
