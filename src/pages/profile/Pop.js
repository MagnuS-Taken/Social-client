import React from "react";
import { Modal } from "react-bootstrap";

export default function Pop({ title, message }) {
  console.log(title, message);
  return (
    <React.Fragment>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "lightblue", color: "black" }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </React.Fragment>
  );
}
