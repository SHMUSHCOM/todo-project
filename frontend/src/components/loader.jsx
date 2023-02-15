import React from 'react';
import styled from 'styled-components'

const Loader = () => {
    return (
        <Styles>
            <div className="spinner-mount">
                <span className='spinner'></span>
            </div>
        </Styles>
    );
}

const Styles = styled.div`
    height: 100%;

      .spinner-mount {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
      }
      .spinner {
        animation: rotate 1s infinite;
        height: 50px;
        width: 50px;
      }

      .spinner:before,
      .spinner:after {
        border-radius: 50%;
        content: "";
        display: block;
        height: 20px;
        width: 20px;
      }
      .spinner:before {
        animation: ball1 1s infinite;
        background-color: #b92cfa;
        box-shadow: 30px 0 0 #7900B0;
        margin-bottom: 10px;
      }
      .spinner:after {
        animation: ball2 1s infinite;
        background-color: #7900B0;
        box-shadow: 30px 0 0 #b92cfa;
      }

      @keyframes rotate {
        0% { transform: rotate(0deg) scale(0.8) }
        50% { transform: rotate(360deg) scale(1.2) }
        100% { transform: rotate(720deg) scale(0.8) }
      }

      @keyframes ball1 {
        0% {
          box-shadow: 30px 0 0 #7900B0;
        }
        50% {
          box-shadow: 0 0 0 #7900B0;
          margin-bottom: 0;
          transform: translate(15px, 15px);
        }
        100% {
          box-shadow: 30px 0 0 #7900B0;
          margin-bottom: 10px;
        }
      }

      @keyframes ball2 {
        0% {
          box-shadow: 30px 0 0 #b92cfa;
        }
        50% {
          box-shadow: 0 0 0 #b92cfa;
          margin-top: -20px;
          transform: translate(15px, 15px);
        }
        100% {
          box-shadow: 30px 0 0 #b92cfa;
          margin-top: 0;
        }
      }

`

export default Loader;


