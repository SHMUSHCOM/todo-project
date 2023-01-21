import React from 'react';
import styled from 'styled-components'
import Avatar from './avatar';
import ProgressBar from './progress-bar';
import Tags from './tag'
import formatDate from '../utils/date';
import Status from './status';
import ActionsMenu from './actions-menu';


const Card = ({ owner, title, details, status, tags, due, progress }) => {
    return (
        <Styles >
            <div className='owner'>
                <Avatar/>
                <span>{owner}</span>
            </div>
            <span>{title}</span>
            <Status status={status}></Status>
            <Tags tags={tags}></Tags>
 
            <span> {formatDate(due)}</span>
            <ProgressBar progress={progress}/>
            <ActionsMenu/>

        </Styles>
    );
}

const Styles = styled.div`

    .owner {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
        max-height: 30px;
    }

    }


    flex-basis: 100%;
    height: 70px;
    padding: 15px;
    border: 1px solid var(--very-light-grey);
    border-radius: 5px;
    
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;

    font-weight: 100;
    background-color: white;
    

    & > *:not(.actions-menu) {
        flex-basis: 0;
        flex-grow: 1;
        overflow: scroll;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &:hover {
        border: 1px solid var(--purple);
        /* box-shadow: 2px 2px 7px #31083026;  */
        box-shadow:  1px 1px 8px 2px #afafaf39;
    }




    
`

export default Card;
