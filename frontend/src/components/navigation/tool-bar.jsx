import React from 'react';
import styled from 'styled-components';
import Avatar from '../todo/avatar';
import GlobalSearch from './global-search';



const ToolBar = () => {
    return (
        <Styles>
            <GlobalSearch className='global-search'></GlobalSearch>
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


    @media only screen and (max-width: 500px) {
        .search {
            display: none;
        }
    
    }
`

export default ToolBar;
