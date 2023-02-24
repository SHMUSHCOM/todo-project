import React from 'react';
import styled from 'styled-components';
import Avatar from '../todo/avatar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/slices/app.slice';
import { useSelector } from 'react-redux';


const ProfileMenu = ({id}) => {
    const user = useSelector( state => state.app.user)
    const dispatch = useDispatch()

    const handleLogout = event => {
        dispatch(logout())
        window.localStorage.clear('state')
    }

    return (
        <Styles>
            <p>{!!user && `${user.firstName} ${user.lastName}`}</p>
            <Avatar/>
            <ul className='menu'>
                <li><Link onClick={handleLogout} to='/auth/login'>Settings</Link></li>
                <li><Link onClick={handleLogout} to='/auth/login'>Logout</Link></li>
            </ul>
        </Styles>
    );
}


const Styles = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;

    cursor: pointer;
    position: relative;
    overflow: visible;
    
    .menu {
        display: none;
        position: absolute;
        inset: 32px 0px auto auto;


        list-style: none;
        padding: 20px 50px;

        background-color: white;
        border: 1px solid #c8c8c8;
        box-shadow: 1px 1px 9px 1px #c8c8c861;
    }

    &:hover .menu {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }




`

export default ProfileMenu;
