import React, {useEffect} from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { playlistChanged } from '../state/slices/playlist.slice';

const Playlists = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      async function getData() {
        const response = await fetch("http://localhost:1234/playlists/");
        const data = await response.json();
        dispatch(playlistChanged(data));
      }
  
      getData().catch(console.log);
    }, []);


    const playLists = useSelector( state => state.playlists)

    return (
        <Styles>
            <h1>Playlists</h1>
            <pre> {JSON.stringify(playLists,null,4)}</pre>
        </Styles>
    );
}


const Styles = styled.div`
    
    width: 250px;
    min-height: 100px;
    margin: 0;




`

export default Playlists;
