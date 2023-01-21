import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './button'
import Status from './status';

const Filters = () => {
    const todos = useSelector( state=>state.todos)
    const doneTodos = todos.filter(todo=>todo.status == 'DONE')
    const inprogressTodos = todos.filter(todo=>todo.status == 'INPROGRESS')
    const notstartedTodos = todos.filter(todo=>todo.status == 'NOTSTARTED')
    console.log(doneTodos.length)
    return (
        <Styles>
            <div className="primary filter">
                <div className="content">
                    <h4>All Tasks</h4>
                    <h2>{todos.length}</h2>
                    <Button>Create New Task</Button>
                </div>
            </div>
            <div className="secondary filter">
                <div className="not-started content">
                    <Status status='NOTSTARTED' vertical={true} large={true}/>
                    <h2>{notstartedTodos.length}</h2>
                </div>
                <div className="in-progress content">
                    <Status status='INPROGRESS' vertical={true} large={true}/>
                    <h2>{inprogressTodos.length}</h2>
                </div>
                <div className="done content">
                    <Status status='DONE' vertical={true} large={true}/>
                    <h2>{doneTodos.length}</h2>
                </div>
            </div>
        </Styles>
    );
}


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
            font-weight: 900;
            font-size: 30px;
        }

        h4 {
            font-weight: 200;
            font-size: 14px;
            color: var(--purple)
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
        border: 1px solid var(--very-light-grey);
        background-color: white;

        .content {

            align-items: center;
        }
    }


    
`

export default Filters;
