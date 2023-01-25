import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavItem from "../components/nav-item";
import { FiList, FiAlignLeft, FiGrid, FiGlobe } from "react-icons/fi";

const LeftPanel = () => {
  return (
    <Styles className="panel">
      <nav>
        <ul>
          <li>
            <NavItem to="/list">
              <FiList/>
              List
            </NavItem>
          </li>
          <li>
            <NavItem to="/board">
              <FiGrid />
              Board
            </NavItem>
          </li>
          <li>
            <NavItem to="/timeline">
              <FiAlignLeft />
              Timeline
            </NavItem>
          </li>
        </ul>
      </nav>
      <NavItem to="/404"><FiGlobe/>404 Page</NavItem>
    </Styles>
  );
};

const Styles = styled.div`
  min-width: 250px;
  min-height: 100%;
  padding-top: 50px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  background-color: white;
  border-right: 1px solid #cccccc;

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export default LeftPanel;
