import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`

  :root {
    --header-height: 70px;
    --purple: #7900B0;
    --light-purple: #bf35ff10;
    --light-grey: #808080;
    --very-light-grey: #dcdcdc;
    font-family: 'Poppins', Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
  }

  * {
    box-sizing: border-box;
  }

  html {
    height: 100dvh;
    /* height: -webkit-fill-available;
    height: fill-available; */
    margin:0;
    padding: 0;
  }

  body {
    margin: 0;
    padding:0;
    height: 100%;
    /* height: -webkit-fill-available; */
    /* height: fill-available; */
    display: flex;
    place-items: center;
    min-width: 320px;
    /* min-height: 100%; */
  }

  h1, h2,h3,h4,h5,h6 {
    margin: 0;
  }

  form, input, textarea, button {
    font-family: inherit;
  }

  a {
  font-weight: 500;
  text-decoration: none;
  }

  .ReactModal__Content {
    transform: scale(0.90);
    opacity: 0;
    transition: 
      transform 300ms cubic-bezier(1,-1.35, 0, 2.54),
      opacity 300ms ease-in
    /* transition: transform 500ms cubic-bezier(1,-0.49, 0, 1.53); */
  }

  .ReactModal__Content--after-open {
    transform: scale(1);
    opacity: 1;
    
  }

`

export default GlobalStyles