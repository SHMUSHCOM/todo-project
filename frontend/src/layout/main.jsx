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
    background-color: #f9f9f9;
    color: black;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
      gap: 20px;

  }

`

export default Main;
