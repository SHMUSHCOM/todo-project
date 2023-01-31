import React from 'react';
import styled from 'styled-components';
import Avatar from './avatar';

import { useDispatch } from 'react-redux'
import { searchFilterUpdated } from '../state/slices/app.slice'




const ToolBar = () => {
    const dispatch = useDispatch()

    function onSearchChange(event){
        dispatch(searchFilterUpdated(event.target.value))
    }

    return (
        <Styles>
            <div className='search'>
                <img src='/search.svg'></img>
                <input type="text" placeholder='Search everywhere' onChange={onSearchChange}></input>
            </div>
            <Avatar/>     
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

export default ToolBar;
