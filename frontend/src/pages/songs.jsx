import React, { useEffect } from "react";
import styled from "styled-components";
import { songsChanged } from "../state/slices/song.slice";
import { useDispatch, useSelector } from "react-redux";

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
      <pre>{JSON.stringify(songs, null, 4)}</pre>
    </Styles>
  );
};

const Styles = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  overflow: auto;

`;

export default Songs;
