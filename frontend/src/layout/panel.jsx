import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const SidePanel = () => {
    return (
        <Styles className='panel'>
            <nav>
                <ul>
                    <li><NavLink to='/songs'>Songs</NavLink></li>
                    <li><NavLink to='/artists'>Artists</NavLink></li>
                    <li><NavLink to='/playlists'>Playlists</NavLink></li>
                </ul>
            </nav>
        </Styles>
    );
}


const Styles = styled.div`
    
    min-width: 250px;
    min-height: 100%;
    padding-top: 50px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: white;
    border-right: 1px solid #CCCCCC;

    ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    a, a:visited {
        width: 100%;
        display: block;
        padding: 20px;
        color: #151515;
    }

    a.active {
        background-color: #bf35ff10;
        color: #7900B0;
        border-right: 5px solid #7900B0;
    }

    a:hover:not(.active) {
        background-color: #EDEDED50;
    }

    a:hover {
        font-weight: 600;
    }



`

export default SidePanel;
