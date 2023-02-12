import React, { useEffect } from "react";
import styled from "styled-components";

import TodoHeader from "./todo-header";
import TodoContainer from "./todo-container";
import Filters from './todo-filters'



const ListView = () => {
  
  return (
    <Styles>
      <Filters className="filters"/>
      <TodoHeader/>
      <TodoContainer/>
    </Styles>
  );
};

const Styles = styled.div`
  .long-text {
    width: 50px;
    white-space: nowrap;
    overflow: hidden;
  }

  width: 100%;
  height: calc(100vh - var(--header-height));
  padding: 20px;
  position: relative;
  
  
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ListView;
