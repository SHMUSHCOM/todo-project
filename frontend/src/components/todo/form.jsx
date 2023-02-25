import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components'

import { useSelector } from 'react-redux';
import { useInvalidateTodos, useUpdateTodo } from '../../network/todo.requests';
import {formatDatePicker} from '../../utils/date';

import Button from '../button';
import StatusSelect, {OPTIONS}  from './status-select';
import UserSelect from './user-select';
import EmptyState from './empty-state';

const TodoForm = () => {
    
    const todos = useSelector( state => state.todos)
    const todo = useSelector( state => todos.find(todo => todo?._id == state.app.selectedTodo))
    const users = useSelector( state => state.users)
    
    // TRANSFORM | REDUX DATA -> FORM DATA
    const serializeTodo = (todo) => ({ 
        ...todo,
        owner: {label: `${todo?.owner?.firstName} ${todo?.owner?.lastName}`, value: todo?.owner?._id},
        status: OPTIONS.find( option => option.value == todo?.status),
        tags: todo?.tags?.toString(),
        due: formatDatePicker(todo?.due),
    })

    // TRANSFORM | FORM DATA -> REDUX DATA
    const deserializeTodo = (todo) => ({
        ...todo, 
        status: todo?.status?.value,
        tags: todo?.tags?.split(','),
        owner: users.find( user => user?._id == todo?.owner?.value),
    })
    
    // SETUP REACT HOOK FORM
    const initialFormState = {values:serializeTodo(todo)}
    const { register, handleSubmit, reset, control, formState: {errors, isDirty}} = useForm(initialFormState)
    
    // UPDATE SERVER AND INVALIDATE REDUX STORE
    const updateTodo = useUpdateTodo()
    const { invalidateTodos } = useInvalidateTodos()
    const submitData = async formData => {
        await updateTodo(deserializeTodo(formData))
        invalidateTodos()
    }

    // RESET REACT HOOK FORM
    const resetData = () => reset(serializeTodo(todo))
    
    // EMPTY STATE
    if (!todo) return <EmptyState/>

    // HAPPY STATE
    return (
       <Styles>
            <form onSubmit={handleSubmit(submitData)} >

                <div className="fields">
                    <div className="input">
                        <label htmlFor="owner">Owner</label>
                        <Controller control={control} name="owner" rules={{required:'Owner required'}} render={({field}) => <UserSelect field={field} />} />
                        <span className="error">{errors?.owner?.message}</span>
                    </div>
                    <div className="input">
                        <label htmlFor="title">Title <sup>*</sup></label>
                        <input type="text" {...register('title', {required: 'Title required'})}/>
                        <span className="error">{errors?.title?.message}</span>
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
                        <Controller control={control} name="status" rules={{required:'Status required'}} render={({field}) => <StatusSelect field={field} />} />
                        <span className="error">{errors?.status?.message}</span>
                    </div>
                    <div className="input">
                        <label htmlFor="points">Points</label>
                        <input type="number" {...register('points', {max: {value: 20, message: "20 point maximum"}, valueAsNumber: true})} />
                        <span className="error">{errors?.points?.message}</span>
                    </div>
                    <div className="input">
                        <label htmlFor="progress">Progress (% completed)</label>
                        <input type="range" {...register('progress', {min: 0, max: 100, valueAsNumber: true})}/>
                    </div>
                </div>
                <div className="buttons">
                    <Button type='submit'>Save</Button>
                    {isDirty && <Button primary={false} onClick={resetData} >Dismiss changes</Button>}
                </div>                
            </form>
        </Styles>
    );
}

const Styles = styled.div`
    overflow: scroll;
    form {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
        font-weight: 500;
    }

    .fields {
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
            font-weight: 300;

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
        white-space: nowrap;
    }

    .error {
        color: red;
        font-size: 12px;
        white-space: nowrap;
    }

    input[type=”range”]::-webkit-slider-runnable-track, input[type=”range”]::-webkit-slider-thumb, input[type=”range”]::-moz-range-thumb, input[type=”range”]::-moz-range-track {
        background-color: var(--purple);
    }
`
export default TodoForm;
