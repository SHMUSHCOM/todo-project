import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import formatDate from "../../utils/date";

import { useDispatch, useSelector } from "react-redux";
import { todoSelected } from "../../state/slices/app.slice";

import Avatar from "./avatar";
import ProgressBar from "./progress-bar";
import Tags from "./tag";
import Status from "./status-item";
import ActionsMenu from "./action-menu";

const TodoItem = ({
  _id,
  owner,
  title,
  status,
  tags,
  due,
  progress,
  points,
}) => {
  const dispatch = useDispatch();
  const isSelected = useSelector(state => state.app.selectedTodo == _id);

  const todoItem = useRef(null);
  useEffect(() => {
    if (isSelected) todoItem.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [isSelected]);

  return (
    <Styles
      ref={todoItem}
      status={status}
      isSelected={isSelected}
      onClick={() => {
        dispatch(todoSelected(_id));
      }}
    >
      <div className="owner">
        <Avatar className="avatar" />
        <span className="owner-name">{owner}</span>
      </div>
      <span className="title">{title}</span>
      <Tags className="tags" tags={tags}></Tags>

      <span className="due"> {formatDate(due)}</span>
      <Status className="status" status={status}></Status>
      <span className="points"> {points} </span>
      <ProgressBar className="progress" progress={progress} />
      <ActionsMenu className="actions" id={_id} />
    </Styles>
  );
};

const Styles = styled.div`
  cursor: pointer;
  width: 100%;
  height: 70px;
  padding: 15px;
  border: 1px solid var(--very-light-grey);
  border-radius: 5px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 30px;

  font-weight: 300;
  background-color: white;

  & > *:not(.actions-menu, .points) {
    flex-basis: 0;
    flex-grow: 1;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .points {
    width: 15px;
    display: flex;
    justify-content: center;
  }

  .tags {
    overflow-x: scroll;
    scroll-behavior: smooth;
  }

  &:hover,
  &:focus {
    border: 1px solid var(--purple);
    box-shadow: 1px 1px 8px 2px #afafaf39;
  }

  ${({ isSelected }) => {
    return isSelected
      ? `border: 1px solid var(--purple); box-shadow:  1px 1px 8px 2px #afafaf39; background-color: var(--light-purple); `
      : ``;
  }}

  .owner {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    img {
      max-height: 30px;
    }
  }

  @media only screen and (max-width: 600px) {
    width: calc(100vw - 40px);

    .owner-name,
    .avatar,
    .tags,
    .points,
    .progress,
    .due {
      display: none;
      flex-basis: min-content;
      flex-shrink: 1;
      flex-grow: 0;
    }

    .owner {
      flex-basis: min-content;
      flex-shrink: 1;
      flex-grow: 0;
    }
  }

  /* ${({ status }) => {
    return status === "DONE"
      ? `text-decoration: line-through;
         text-decoration-color: #939393;
         text-decoration-thickness: 2px;
         filter: blur(0.05em);`
      : ``;
  }} */
`;

export default TodoItem;
