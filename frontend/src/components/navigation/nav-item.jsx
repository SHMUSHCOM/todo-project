import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const NavItem = ({to, children}) => {
    return (
        <Styles>
            <NavLink to={to}>
                {children}
            </NavLink>
        </Styles>
    );
}

const Styles = styled.div`

    a, a:visited {
        width: 100%;
        display: flex;
        align-items: center ;
        gap: 10px;
        padding: 20px;
        color: #151515;
    } 

    a.active {
        background-color: var(--light-purple);
        color: var(--purple);
        border-right: 5px solid var(--purple);
    }

    a:hover:not(.active) {
        background-color: #EDEDED50;
    }

    a:hover {
        font-weight: 600;
    }
 
`

export default NavItem;
