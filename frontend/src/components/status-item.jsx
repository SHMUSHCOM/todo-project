import React, { Fragment } from 'react';
import styled from 'styled-components'
import {FiXOctagon, FiCheck, FiClock} from 'react-icons/fi' 

const STATUS = {
    DONE: 'Done',
    INPROGRESS: 'In Progress',
    NOTSTARTED: 'Not Started'
}

const StatusIcon = ( props )=>{
    const {status} = props
    switch(STATUS[status]){
        case STATUS.DONE:
            return <FiCheck {...props} />

        case STATUS.INPROGRESS:
            return <FiClock {...props}/>

        case STATUS.NOTSTARTED:
            return <FiXOctagon {...props}/>
        
        default: 
            return <Fragment></Fragment>
    }
}



const Status = ({status=STATUS.NOTSTARTED, large=false, vertical=false}) => {
    return (
        <Styles status={status} vertical={vertical} large={large} >
            <div className="icon-background">
                <StatusIcon status={status} className='icon' size={large?`1.5em`:`1em`}/>
            </div>
            <span>{STATUS[status]}</span>
        </Styles>
    );
}

const Styles = styled.div`


    display: flex;
    align-items: center;
    gap: 5px;

    ${({vertical}) => {
        return vertical
            ?`flex-direction: column-reverse;gap:20px;`
            : ``
    }}

    ${({large})=>{
        return large 
            ? `font-size: 12px;`
            : ``
    }}

    .icon-background {
        

        ${({large})=>{
            return large 
                ? `width: 36px; height: 36px;`
                : `width: 24px; height: 24px;`
        }}


        border-radius: 100%;

        display: grid;
        place-items: center;

        ${ ({status})=>{
            switch(STATUS[status]){
                case STATUS.DONE:
                    return 'background-color: #D2FFCB';

                case STATUS.INPROGRESS:
                    return 'background-color: #fffbd5';

                case STATUS.NOTSTARTED:
                    return 'background-color: #FFEBEB';
                
                default: 
                    return '';
            }
        }}




        
    }

    .icon {
        color:${ ({status})=>{
            switch(STATUS[status]){
                case STATUS.DONE:
                    return '#04B000';

                case STATUS.INPROGRESS:
                    return '#ffe600';

                case STATUS.NOTSTARTED:
                    return '#B00000';
                
                default: 
                    return '#04B000';
            }
        }}


    }
`
export default Status;
