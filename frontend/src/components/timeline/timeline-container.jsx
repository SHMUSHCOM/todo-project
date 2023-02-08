import React from "react";
import styled from "styled-components";
import TodoTimelineItem from "./timeline-item";
import { useSelector } from "react-redux";
import { isSameDay } from "../../utils/date";

const TimelineContainer = () => {
  const todos = useSelector(state => state.todos).filter( todo => isSameDay(todo.due, '2020-07-19'))

  return (
    <Styles className="timeline">
      {todos.map(todo => (
        <TodoTimelineItem
          key={todo?._id}
          type="active"
          {...todo}
        ></TodoTimelineItem>
      ))}
    </Styles>
  );
};

const Styles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
export default TimelineContainer;
