import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const ProgressBar = ({ progress, className }) => {
  const hasProgressed = Number(progress) > 20;
  const outer = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const [outerWidth] = window
        .getComputedStyle(outer.current)
        .width.split("px");
      const innerWidth = parseInt(Math.ceil((progress / 100) * outerWidth));
      setWidth(innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [progress]);

  return (
    <Styles className={className} width={width} ref={outer}>
      {!hasProgressed ? `${progress}%` : ""}
      <div className={"progress-bar"}>{hasProgressed ? `${progress}%` : ""}</div>
    </Styles>
  );
};

const Styles = styled.div`
  box-sizing: content-box;
  min-width: 100px;
  height: 25px;
  border: 1px solid var(--purple);
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;


  color: var(--purple);

  font-size: 12px;

  .progress-bar {
    width: ${({ width }) => `${width}px`};
    height: 25px;
    border-radius: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    color: var();
    background-color: var(--light-purple);
  }
`;
export default ProgressBar;
