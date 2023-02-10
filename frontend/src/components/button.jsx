import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished'
import { useRef, useState, useEffect } from 'react';

const Button = ({type, primary=true, children, onClick}) => {

    return (
        <StyledButton  primary={primary} onClick={onClick} type={type}>
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    min-width: 100px;
    min-height: 40px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;


    &:hover {
        background-color: ${lighten(0.1, '#7900B0')};
        ${({primary}) => {
        return primary 
            ? `background-color: ${lighten(0.1, '#7900B0')}`
            : `background-color: ${lighten(0.6, '#7900B0')}`
    }  };
    }

    
    ${({primary}) => {
        return primary 
            ? `background-color: var(--purple); color: white;`
            : `background-color: white; color: var(--purple); border: 1px solid var(--purple); font-weight: 300;`
    }  };
`
export default Button;
