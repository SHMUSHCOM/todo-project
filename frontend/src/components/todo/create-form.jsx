import React , {useEffect, useRef}from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components'

import Button from '../button';
import StatusSelect from './status-select';
import {OPTIONS}  from './status-select'

import { useSelector, useDispatch } from 'react-redux';
import { todoUpdated } from '../../state/slices/todo.slice';
import { todoSelected } from '../../state/slices/app.slice';
import { useCreateTodo } from '../../network/requests';

import {formatDatePicker} from '../../utils/date';

const TodoForm = ({modalOpen, setModalOpen}) => {
    const dispatch = useDispatch()
    
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
    
    const createTodo = useCreateTodo()
    const initialFormState = {values: serializeTodo({status: "NOTSTARTED", due: Date.now(),})}
    const { register, handleSubmit, reset, control, formState: {errors, isDirty}} = useForm(initialFormState)
    const submitData = async formData => {
        const {data, isError, isLoading} = await createTodo(deserializeTodo(formData))
        if (!isError) dispatch(todoSelected(data._id))
        else console.log(data)
        setModalOpen(false)
    }

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
                        <textarea type="text" rows={7} {...register('details')}/>
                    </div>
                    <div className="input">
                        <label htmlFor="status">Status</label>
                        <Controller control={control} name="status" rules={{required:'Status required'}} render={({field}) => <StatusSelect field={field} />} />
                        <span className="error">{errors?.status?.message}</span>
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
