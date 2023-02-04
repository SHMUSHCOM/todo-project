import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components'

import StatusSelect from './status-select';
import {OPTIONS}  from './status-select'

import Button from '../button';
import { useSelector, useDispatch } from 'react-redux';
import { todoUpdated } from '../../state/slices/todo.slice';

import {formatDatePicker} from '../../utils/date';

const TodoForm = () => {
    const dispatch = useDispatch()
    const todos = useSelector( state => state.todos)
    const todo = useSelector( state => todos.find(todo => todo._id == state.app.selectedTodo))
    
    // Transform state data into form data
    const serializeTodo = (todo) => ({ 
        ...todo,
        status: OPTIONS.find( option => option.value == todo?.status),
        tags: todo?.tags?.toString(),
        due: formatDatePicker(todo?.due),
    })

    // Transform form data into state data
    const deserializeTodo = (todo) => ({
        ...todo, 
        status: todo?.status?.value,
        tags: todo?.tags?.split(','),
    })
    
    const { register, handleSubmit, reset, control, formState: {errors, isDirty}} = useForm({values:serializeTodo(todo)})
    const submitData = data => dispatch(todoUpdated(deserializeTodo(data)))
    const resetData = () => reset(serializeTodo(todo))
    
    return (
       <Styles>
            <form onSubmit={handleSubmit(submitData)} >
                <div className="fields">
                    <div className="input">
                        <label htmlFor="owner">Owner</label>
                        <input type="text" {...register('owner', { required: 'Owner required'})}/>
                        <span className="error">{errors?.owner?.message}</span>
                    </div>
                    <div className="input">
                        <label htmlFor="title">Title</label>
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
                        <input type="number" {...register('points', {required: 'Points required', min: {value: 1, message: "1 point minimum"}, max: {value: 20, message: "20 point maximum"}, valueAsNumber: true})} />
                        <span className="error">{errors?.points?.message}</span>
                    </div>
                    <div className="input">
                        <label htmlFor="progress">Progress (% completed)</label>
                        <input type="number" {...register('progress', {min: 0, max: 100, valueAsNumber: true})}/>
                    </div>
                </div>
                <div className="buttons">
                    <Button type='submit'>Save</Button>
                    <Button primary={false} onClick={resetData} >Dismiss changes</Button>
                    {isDirty && <div className='error'>Unsaved Changes</div>}
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
`
export default TodoForm;
