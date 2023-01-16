import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { artistsChanged } from "../state/slices/artist.slice";
import formatDate from "../utils/date";
import Card from "../components/card";

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

  const artists = useSelector(state => state.artists);
  return (
    <Styles>
      <h1>Artists</h1>
      <div className="container">
        {artists.map(artist => (
          <Card
            key={artist._id}
            title={`${artist.firstName} ${artist.lastName}`}
            subtitle={artist.bio}
            attributes={[
              { label: "Birthday", content: formatDate(artist.dateOfBirth) },
              { label: "Genre", content: artist.genre },
              { label: "Country", content: artist.country },
            ]}
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

export default Artists;
