import React from "react"
import styled from "styled-components"

const MarketingPanel
 = () => {
  return (
    <Styles>
      <div className="marketing">
        <ul>
          <li>100% Free</li>
          <li>Share your progress</li>
          <li>Accelerate your learning</li>
          <li>Share practice lessons and test routes</li>
        </ul>
        <img src="/car.png" alt="Image of a vehicle" />
      </div>
    </Styles>
  )
}

const Styles = styled.div`
  height: 100%;

  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--light-purple);

  .marketing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;

    ul {
      padding: 20px;
      list-style-type: none;

      li {
        padding-left: 2rem;
        background-image: url("/favicon.png");
        background-position: 0 0;
        background-size: 1.3rem 1.3rem;
        background-repeat: no-repeat;
      }

      border: 1px solid var(--light-grey);
      border-radius: 5px;
      box-shadow: 2px 2px 10px 2px #6e6e6e2f;

      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;

      background-color: white;
      transform: rotate(-5deg);
    }
  }
`
export default MarketingPanel

