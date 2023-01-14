import React, {useEffect} from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { artistsChanged } from '../state/slices/artist.slice';

const Artists = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      async function getData() {
        const response = await fetch("http://localhost:1234/artists/");
        const data = await response.json();
        dispatch(artistsChanged(data));
      }
  
      getData().catch(console.log);
    }, []);

    const artists = useSelector( state => state.artists)
    return (
        <Styles>
            <h1>Artists</h1>
            <pre>{JSON.stringify(artists, null, 4)}</pre>
        </Styles>
    );
}


const Styles = styled.div`
    
    width: 250px;
    min-height: 100px;
    margin: 0;
 



`

export default Artists;
