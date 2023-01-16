import React from 'react';
import styled from 'styled-components';

const ToolBar = () => {
    return (
        <Styles>
            <div className='search'>
                <img src='/search.svg'></img>
                <input type="text" placeholder='Search everywhere'></input>
            </div>
            <img src="/Avatars.png" alt="Profile Image" />

            
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
    }

    input {
        border: none;
        outline: none;
    }

`

export default ToolBar;
