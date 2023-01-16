import React, { useEffect } from "react";
import styled from "styled-components";
import { songsChanged } from "../state/slices/song.slice";
import { useDispatch, useSelector } from "react-redux";
import Card from '../components/card'
import formatDate from "../utils/date";



const Songs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:1234/songs/");
      const data = await response.json();
      dispatch(songsChanged(data));
    }

    getData().catch(console.log);
  }, []);

  const songs = useSelector(state => state.songs)
  return (
    <Styles>
      <h1>Songs</h1>
      <div className="container">
        {songs.map(song=><Card 
          key={song._id} 
          title={song.name} 
          subtitle={song.album} 
          attributes={[{label: 'Released', content:formatDate(song.released)},{label: 'Label', content:song.label},{label: 'Duration', content:song.duration}]}
        ></Card>)}
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    position: sticky;
    top: 0;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

`;

export default Songs;
