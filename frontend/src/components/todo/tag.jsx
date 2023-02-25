import React from 'react'
import styled from 'styled-components'

const Tags = ({tags}) => {
    return (
        <Styles className='tags'>
           {tags?.map(tag => tag && <span key={tag}>{tag.trim()}</span>)} 
        </Styles>
    );
}
const Styles = styled.div`
    display: flex; 
    align-items: center;
    justify-content: flex-start;
    gap: 5px;

    overflow: scroll;



    span {
        padding: 7px 15px;
        border-radius: 50px;

        background-color: var(--light-purple);
        color: var(--purple);
        font-size: 14px;

        user-select: none;

    }

`
export default Tags;
