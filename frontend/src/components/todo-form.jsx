import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
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
    
    const { register, handleSubmit, watch, formState: {errors} } = useForm({
        defaultValues: 
    })


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
    
    return (
       <Styles>
            <form onSubmit={handleSubmit((data) => console.log(data))} >
                <div className="fields">
                    <div className="input">
                        <label htmlFor="owner">Owner</label>
                        <input type="text" {...register('owner')}/>
                    </div>
                    <div className="input">
                        <label htmlFor="title">Title</label>
                        <input type="text" {...register('title')}/>
                    </div>
                    <div className="input">
                        <label htmlFor="details">Details</label>
                        <textarea type="text" rows={8} {...register('details')}/>
                    </div>
                    <div className="input">
                        <label htmlFor="tags">Tags (comma separated)</label>
                        <input type="text" {...register('tags')}/>
                    </div>
                    <div className="input">
                        <label htmlFor="due">Due date</label>
                        <input type="date" {...register('due')}/>
                    </div>
                    <div className="input">
                        <label htmlFor="status">Status</label>
                        <StatusSelect value={selectState} setValue={setSelectState}/>
                    </div>
                    <div className="input">
                        <label htmlFor="points">Points</label>
                        <input type="number" {...register('points')}/>
                    </div>
                    <div className="input">
                        <label htmlFor="progress">Progress (% completed)</label>
                        <input type="number" {...register('progress')}/>
                    </div>
                </div>
                <div className="buttons">
                    <Button type='submit' >Save</Button>
                    <Button primary={false} >Dismiss changes</Button>
                    {formIsDirty() && <h6>Unsaved Changes</h6>} 
                </div>                
            </form>
        </Styles>
    );
}

const Styles = styled.div`
    min-height: 100%;
    

    form {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
