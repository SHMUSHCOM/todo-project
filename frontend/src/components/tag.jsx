import React from 'react'
import styled from 'styled-components'

const Tags = ({tags}) => {
    return (
        <Styles className='tags'>
           {tags.map(tag => <span key={tag}>{tag}</span>)} 
        </Styles>
    );
}
const Styles = styled.div`
    display: flex; 
    align-items: center;
    justify-content: flex-start;
    gap: 5px;


    span {
        padding: 5px 10px;
        border-radius: 50px;
        background-color: var(--light-purple);
        font-size: 14px;

    }

`
export default Tags;
