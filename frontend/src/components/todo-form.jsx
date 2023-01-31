import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import StatusSelect from './status-select';
import {OPTIONS}  from './status-select'
import Button from './button';
import { useSelector, useDispatch } from 'react-redux';
import { todoUpdated } from '../state/slices/todo.slice';
import {formatDatePicker} from '../utils/date';
import {isEqual} from 'lodash'



const TodoForm = () => {
    const dispatch = useDispatch()
    const todos = useSelector( state => state.todos)
    const todo = useSelector( state => todos.find(todo => todo._id == state.app.selectedTodo) )
    const [formData, setFormData] = useState(todo || {})
    const [selectState, setSelectState] = useState()

    const updateForm = ()=>{
        setFormData({...todo})
        const option = OPTIONS.find(option => option.value == todo?.status)
        setSelectState(option)
    }

    const formIsDirty = ()=> !isEqual(formData, todo)
    
    useEffect(()=> {
        console.log({todo})
        updateForm()
    } ,[todo])


    useEffect(() => {
        setFormData({...formData, status: selectState?.value})
    },[selectState])
    
    console.log({todo})
    console.log({formData})
    return (
       <Styles>
            <form >
                <div className="input">
                    <label htmlFor="owner">Owner</label>
                    <input type="text" name="owner" id="owner" placeholder='Enter an owner' value={formData.owner} onChange={(event)=>{setFormData({...formData, [event.target.name]: event.target.value})}}/>
                </div>
                <div className="input">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder='Enter an title' value={formData.title} onChange={(event)=>{setFormData({...formData, [event.target.name]: event.target.value})}}/>
                </div>
                <div className="input">
                    <label htmlFor="details">Details</label>
                    <textarea type="text" rows={8} name="details" id="details" placeholder='Enter details' value={formData.details} onChange={(event)=>{setFormData({...formData, [event.target.name]: event.target.value})}}/>
                </div>
                <div className="input">
                    <label htmlFor="tags">Tags (comma separated)</label>
                    <input type="text" name="tags" id="tags" placeholder='Enter tags' value={formData.tags} onChange={(event)=>{setFormData({...formData, [event.target.name]: event.target.value.split(',')})}}/>
                </div>
                <div className="input">
                    <label htmlFor="due">Due date</label>
                    <input type="date" name="due" id="due" value={formatDatePicker(formData.due)} onChange={(event)=>{setFormData({...formData, [event.target.name]: event.target.value})}}/>
                </div>
                <div className="input">
                    <label htmlFor="status">Status</label>
                    <StatusSelect value={selectState} setValue={setSelectState}/>
                </div>
                <div className="input">
                    <label htmlFor="points">Points</label>
                    <input type="number" name="points" id="points" placeholder='Enter points' min={0} max={20} value={formData.points}  onChange={(event)=>{setFormData({...formData, ['points']: Number(event.target.value)})}}/>
                </div>
                <div className="input">
                    <label htmlFor="progress">Progress (% completed)</label>
                    <input type="number" name="progress" id="progress" placeholder='Enter progress' min={0} max={100} value={formData.progress}  onChange={(event)=>{setFormData({...formData, ['progress']: Number(event.target.value)})}}/>
                </div>                
            </form>


            <div className="buttons">
                <Button type='submit' onClick={()=>{ dispatch(todoUpdated(formData))}} >Save</Button>
                <Button primary={false} onClick={updateForm}>Dismiss changes</Button>
                {formIsDirty() && <h6>Unsaved Changes</h6>} 
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
        align-items: flex-end;
        gap: 10px;

        h6 {
            color: red;
        }
    }
`
export default TodoForm;
