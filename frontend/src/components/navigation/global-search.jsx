
import React , {useEffect}from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux'
import { searchFilterUpdated } from '../../state/slices/app.slice'

import { useForm } from 'react-hook-form';

const GlobalSearch = () => {

    const dispatch = useDispatch()
    const {register, watch} = useForm()

    // Watch changes on search
    useEffect( () => {
        const subscription  = watch(data => dispatch(searchFilterUpdated(data.search)))
        return () => subscription.unsubscribe()
    },[watch])

    return (
        <Styles>
            <div className='search'>
                <img src='/search.svg'></img>
                <input type="text" placeholder='Search everywhere' {...register('search')}></input>
            </div>  
        </Styles>
    );
}

const Styles = styled.div`

    height: 70px;
    padding: 0 20px;
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    .search {
        background-color: white;
        border: 1px solid #ccc;
        display: flex;
        gap: 5px;
        padding: 10px;
        width: 200px;
    }

    input {
        border: none;
        outline: none;
        width: 100%;
    }

`

export default GlobalSearch;
