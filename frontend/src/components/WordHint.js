import React from "react";
import { useState } from "react";

// Import elements from Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import the icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";

function WordHint(props) {
  const [hintModalShow, setHintModalShow] = useState(false);
  return (
    <div className="Hint-Modal">
      <Button
        onClick={() => setHintModalShow(true)}
        className="Hint-Button me-2"
      >
        <FontAwesomeIcon icon={faHandshakeAngle} /> Hint
      </Button>
      <Modal
        size="sm"
        show={hintModalShow}
        centered
        onHide={() => setHintModalShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header className="Modal-Header" closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Hint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.parameter ? (
            <p>{props.parameter}</p>
          ) : (
            <p>Sorry, we don't have hint for this word!</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default WordHint;
