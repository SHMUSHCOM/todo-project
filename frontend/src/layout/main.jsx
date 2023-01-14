import React from 'react';
import styled from 'styled-components'

const Main = ({children}) => {
    return (
        <Styles className='main'>
            {children}
        </Styles>
    );
}


const Styles = styled.div`
    
    width: calc(100vw);
    height: calc(100vh - 70px);
    padding: 0;
    margin: 0;
    position: fixed;
    top: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    color: black;



`

export default Main;
