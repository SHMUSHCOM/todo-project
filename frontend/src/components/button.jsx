import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished'
import { useRef, useState, useEffect } from 'react';

const Button = ({type, primary=true, children, onClick}) => {
    const button  = useRef(null)
    const [color, setColor] = useState()
    useEffect(() => {
        const color = window.getComputedStyle(button.current).backgroundColor
        console.log(color)
        setColor(color)
    },[])

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
    font-weight: 900;
    font-size: 14px;
    cursor: pointer;

    
    ${({primary}) => {
        return primary 
            ? `background-color: var(--purple); color: white;`
            : `background-color: white; color: var(--purple); border: 1px solid var(--purple); font-weight: 100;`
    }  };
`
export default Button;
