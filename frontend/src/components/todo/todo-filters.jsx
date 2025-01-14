import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import { useInvalidateTodos } from "../../network/todo.requests";
import { statusFilterSelected } from "../../state/slices/app.slice";

import styled from "styled-components";
import Button from "../button";
import Status from "./status-item";
import TodoModal from "./todo-modal";

const Filters = () => {
  const todos = useSelector(state => state.todos);
  const filter = useSelector(state => state.app.statusFilter)
  const doneTodos = todos?.filter(todo => todo.status == "DONE");
  const inprogressTodos = todos?.filter(todo => todo.status == "INPROGRESS");
  const notstartedTodos = todos?.filter(todo => todo.status == "NOTSTARTED");

  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch();
  
  const handleNewTodoClick = async () => {
    setModalOpen(true)
  }

  const handleFilterClick = (event) => {
    if (event.target.tagName != 'BUTTON') dispatch(statusFilterSelected(null))
  }
  
  return (
    
    <Styles filter={filter}>
      <div className="primary filter" onClick={handleFilterClick}>
        <div className="content">
          <div className="data">
            <h4>All Tasks</h4>
            <h2>{todos.length}</h2>
          </div>
          <Button onClick={handleNewTodoClick}>Create New Task</Button>
        </div>
      </div>
      <div className="secondary filter" >
        <div className="not-started content" onClick={() => dispatch(statusFilterSelected('NOTSTARTED'))}>
          <Status status="NOTSTARTED" vertical={true} large={true}  />
          <h2>{notstartedTodos.length}</h2>
        </div>
        <div className="in-progress content" onClick={() => dispatch(statusFilterSelected('INPROGRESS'))}>
          <Status status="INPROGRESS" vertical={true} large={true} />
          <h2>{inprogressTodos.length}</h2>
        </div>
        <div className="done content" onClick={() => dispatch(statusFilterSelected('DONE'))}>
          <Status status="DONE" vertical={true} large={true} />
          <h2>{doneTodos.length}</h2>
        </div>
      </div>
      <TodoModal {...{modalOpen, setModalOpen}}></TodoModal>
    </Styles>
  );
};

const Styles = styled.div`
  display: flex;
  gap: 30px;
  position: sticky;
  top: 0;

  .filter {
    min-height: 200px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h2 {
      font-weight: 700;
      font-size: 30px;
    }

    h4 {
      font-weight: 200;
      font-size: 14px;
      color: var(--purple);
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      gap: 20px;
    }
  }

  .primary {
    min-width: 200px;
    border: 1px solid var(--purple);
    background-color: var(--light-purple);
  }

  .secondary {
    flex-basis: 100%;
    align-items: stretch;
    border: 1px solid var(--very-light-grey);
    background-color: white;

    

    .content {
        display: flex;
        justify-content: center;
      align-items: center;
      box-sizing: border-box;
      flex-basis: 120px;
      border-bottom: 3px solid transparent;
      cursor: pointer;

      &:hover {
        border-bottom: 3px solid var(--purple);
    }

    }
  }

  ${({filter}) => {
        switch(filter) {
            case 'NOTSTARTED':
                return ` .secondary .not-started.content {border-bottom: 3px solid var(--purple);}`
            case 'INPROGRESS':
                return ` .secondary .in-progress {border-bottom: 3px solid var(--purple);}`
            case 'DONE':
                return ` .secondary .done {border-bottom: 3px solid var(--purple);}`
            default:
                return ''
        }
    }}


@media only screen and (max-width: 600px) {

    .secondary {
      display: none;
    }

    .primary {
      width: calc(100vw - 40px);
      min-height: 100px;
      

      .content {
        width: 100%;
        padding: 20px;

        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        
      }
    }

      
  }
`;

export default Filters;
