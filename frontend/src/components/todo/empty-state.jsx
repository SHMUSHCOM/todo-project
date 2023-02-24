import React from 'react';
import styled from 'styled-components'

const EmptyState = () => {
    return (
        <Styles>
            
            <img src="./not-found.png" alt="An image of a man searching" />
            <h3>Nothing here to see</h3>
        </Styles>
    );
}
const Styles = styled.div`
    height: 100%;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        max-width: 300px;
        object-fit: contain;
    }

    h3 {
        padding-block: 20px;
        font-weight: 300;
    }
`
export default EmptyState;
