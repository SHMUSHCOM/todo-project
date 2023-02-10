import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

  :root {
    --header-height: 70px;
    --purple: #7900B0;
    --light-purple: #bf35ff10;
    --light-grey: #808080;
    --very-light-grey: #dcdcdc;
    font-family: Poppins, Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
  }

  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    margin:0;
    padding: 0;
  }

  body {
    margin: 0;
    padding:0;
    height: 100%;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100%;
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

`

export default GlobalStyles