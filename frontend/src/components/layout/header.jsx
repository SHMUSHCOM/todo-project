import React from 'react';
import styled from 'styled-components'
import ToolBar from '../../components/navigation/tool-bar';
import Logo from '../../components/logo'

const Header = () => {
    return (
        <Styles className='header'>
            <Logo/>
            <ToolBar/>
        </Styles>
    );
}

const Styles = styled.div`
    
    width: 100%;
    height: var(--header-height);
    padding: 0 20px;
    margin: 0;
    
    position: fixed;
    top: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-bottom: 1px solid #CCCCCC;

    h1 {

        padding: 0;
        margin: 0;
        font-size: 20px;
    }

    @media only screen and (max-width: 600px) {
        
        width: calc(100vw);
            
    }

`

export default Header;
