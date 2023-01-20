import React from 'react';
import styled from 'styled-components'


const Card = ({title, subtitle, attributes}) => {
    return (
        <Styles>
            <hgroup>
                <h2>{title}</h2>
                <h3>{subtitle || 'This is a description'}</h3>
            </hgroup>
        </Styles>
    );
}

const Styles = styled.div`
    /* min-width: 300px; */
    flex-basis: calc((100% / 4) - 20px);
    max-width: calc((100% / 4) - 20px);
    flex-grow: 1;
    height: 300px;
    padding: 30px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    background-color: white;
    box-shadow:  1px 1px 8px 2px #afafaf39;



    hgroup {
        display:flex;
        flex-direction: column;
        gap: 15px;
    }

    h2, h1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h3 {
        font-weight: 400;
    }

    p {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span.label {
        font-weight: 600;
    }
    
`

export default Card;
