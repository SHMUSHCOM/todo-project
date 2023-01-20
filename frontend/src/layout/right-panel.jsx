import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import TodoTimelineItem from "../components/todo-timeline-item";

const RightPanel = () => {
  return (
    <Styles className="panel">
      <h1>Due Today</h1>
      <div className="timeline">
        <TodoTimelineItem type="past" />
        <TodoTimelineItem type="past" />
        <TodoTimelineItem type="active" />
        <TodoTimelineItem type="future" />
        <TodoTimelineItem type="future" />
        <TodoTimelineItem type="future" />
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  min-width: 300px;
  min-height: 100%;
  padding: 20px;
  padding-top: 20px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-left: 1px solid #cccccc;
  background-color: white;

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    gap: 15px;
  }

  .milestone {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }

  .milestone.active {
    background-color: var(--purple);
  }

  .milestone.past {
    background-color: white;
    border: 1px solid var(--light-grey);
  }

  .milestone.future {
    background-color: white;
    border: 1px solid var(--purple);
  }

  hgroup {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  h2,
  h3 {
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  h3 {
    font-weight: 200;
  }
`;

export default RightPanel;
