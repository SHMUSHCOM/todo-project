import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import StatusSelect from './status-select';
import Button from './button';
import { useSelector, useDispatch } from 'react-redux';
import { todoUpdated } from '../state/slices/todo.slice';
import {formatDatePicker} from '../utils/date';

const TodoForm = () => {
    const dispatch = useDispatch()
    const todos = useSelector( state => state.todos)
    const todo = useSelector( state => todos.find(todo => todo._id == state.app.selectedTodo) )
    const [formData, setFormData] = useState(todo)
    const [selectState, setSelectState] = useState()
    console.log(formData)
    
    useEffect(()=> {
        setFormData(todo)
    } ,[todo])

    useEffect( ()=>{
        setFormData({...formData, status: selectState?.value})
    },[selectState])
    
    return (
        <Styles>
            <form onChange={(event)=>{setFormData({...formData, [event.target.name]: event.target.value})}}>
                <div className="input">
                    <label htmlFor="owner">Owner</label>
                    <input type="text" name="owner" id="owner" placeholder='Enter an owner' value={formData.owner} />
                </div>
                <div className="input">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder='Enter an title' value={formData.title}/>
                </div>
                <div className="input">
                    <label htmlFor="details">Details</label>
                    <textarea type="text" name="details" id="details" placeholder='Enter details' value={formData.details}/>
                </div>
                <div className="input">
                    <label htmlFor="status">Status</label>
                    <StatusSelect selectedStatus={selectState} setSelectedStatus={setSelectState}/>
                </div>
                <div className="input">
                    <label htmlFor="tags">Tags (comma separated)</label>
                    <input type="text" name="tags" id="tags" placeholder='Enter tags' value={formData.tags}/>
                </div>
                <div className="input">
                    <label htmlFor="due">Due date</label>
                    <input type="date" name="due" id="due" value={formatDatePicker(formData.due)}/>
                </div>
                <div className="input">
                    <label htmlFor="progress">Progress (% completed)</label>
                    <input type="number" name="progress" id="progress" placeholder='Enter progress' min={0} max={100} value={formData.progress}/>
                </div>                
            </form>
            <div className="buttons">
                <Button onClick={()=>{ dispatch(todoUpdated(formData))}} >Save</Button>
                <Button primary={false}>Dismiss changes</Button>
            </div>
        </Styles>
    );
}

const Styles = styled.div`
    min-height: 100%;
    
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .input {
        display: flex;
        flex-direction: column;
        gap: 5px;

        input, textarea, input[type=date] {
            padding: 7px 10px;
            border: 2px solid var(--very-light-grey);
            border-radius: 5px;
            font-size: 18px;

            &::placeholder, &::-webkit-input-placeholder {
                color:var(--very-light-grey);
            }

            &:focus {
                outline: none;
                border: 2px solid var(--purple);;
            }
        }
    }

    .buttons {
        display: flex;
        justify-content: flex-start;
        gap: 10px;
    }
`
export default TodoForm;
