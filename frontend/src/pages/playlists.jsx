import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { playlistChanged } from "../state/slices/playlist.slice";
import Card from "../components/card";

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

  const playLists = useSelector(state => state.playlists);

  return (
    <Styles>
      <h1>Playlists</h1>
      <div className="container">
        {playLists.map(playList => (
          <Card
            key={playList._id}
            title={playList.name}
            subtitle={playList.description}
            attributes={[{ label: "Artwork", content: playList.artwork }]}
          ></Card>
        ))}
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

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export default Playlists;
