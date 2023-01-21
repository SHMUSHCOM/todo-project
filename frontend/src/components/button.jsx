import React from 'react';
import styled from 'styled-components';

const Button = ({primary=true, children}) => {
    return (
        <StyledButton primary={primary}>
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
    ${({primary}) => {
        return primary 
            ? `background-color: var(--purple); color: white;`
            : `background-color: white; color: var(--purple); border: 1px solid var(--purple)`
    }  };
`
export default Button;
