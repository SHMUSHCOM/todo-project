import React, { useEffect } from "react"
import styled from "styled-components"
import TodoForm from "./create-form"
import { useInvalidateTodos } from "../../network/requests"

import { FiX, FiMaximize2 } from "react-icons/fi"
import ReactModal from "react-modal"
import Button from "../button"

// CUSTOM STYLES | REACT-MODAL
const customStyles = {
  content: {
    // minWidth: 500,
    maxWidth: "95dvw",
    minHeight: 200,
    maxHeight: "80dvh",
    margin: "auto",
    overflow: "hidden",
    boxShadow: "2px 2px 10px 2px #22222235",
  },
  overlay: {
    backdropFilter: "blur(5px)",
  },
}

export default function TodoModal({ modalOpen, setModalOpen }) {
  ReactModal.setAppElement("#root")
  const { invalidateTodos } = useInvalidateTodos()
    useEffect(()=>{

    },[])
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={event => setModalOpen(false)}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={false}
      shouldFocusAfterRender={true}
      onAfterClose={invalidateTodos}
      style={customStyles}
    >
        <ModalContent {...{ modalOpen, setModalOpen }}/>
    </ReactModal>
  )
}

function ModalContent({ modalOpen, setModalOpen }) {
  return (
    <Styles>
      <FiX className="close-icon" onClick={event => setModalOpen(false)} />
      <div className="modal-header">
        <h1>Create New Todo</h1>
        <p>Enter the details for a new todo and save the changes</p>
      </div>
      <div className="form-container">
        <TodoForm {...{ modalOpen, setModalOpen }} />
      </div>
    </Styles>
  )
}

const Styles = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .modal-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 32px;
      font-weight: 500;
    }

    p {
      font-weight: 200;
    }

    & > * {
      margin: 0;
    }
  }

  .close-icon {
    cursor: pointer;
    position: absolute;
    right: 0;
  }

  .form-container {
    width: 100%;
    overflow: scroll;
  }
`
