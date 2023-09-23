import React from "react";
import { useState } from "react";

// Import elements from Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Container, Row } from "react-bootstrap";

// Import the icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faChartSimple,
  faCircleCheck,
  faCircleXmark,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

function GameStatistics(props) {
  const [statisticsModal, setstatisticsModal] = useState(false);
  return (
    <div className="Statistics-Modal">
      <Button
        onClick={() => setstatisticsModal(true)}
        className="Statistics-Button me-2"
      >
        <FontAwesomeIcon icon={faChartSimple} /> Statistics
      </Button>
      <Modal
        size="lg"
        show={statisticsModal}
        centered
        onHide={() => setstatisticsModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Statistics
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs lg="3">
                <div className="Statistics-Card">
                  <p>
                    <FontAwesomeIcon
                      className="Statistics-Card-Icon"
                      icon={faBook}
                    />
                  </p>
                  <h2>{props.prop1}</h2>
                  <p>Total Questions</p>
                </div>
              </Col>
              <Col xs lg="3">
                <div className="Statistics-Card">
                  <p>
                    <FontAwesomeIcon
                      className="Statistics-Card-Icon"
                      icon={faCircleCheck}
                    />
                  </p>
                  <h2>{props.prop3}</h2>
                  <p>Correct Answer</p>
                </div>
              </Col>
              <Col xs lg="3">
                <div className="Statistics-Card">
                  <p>
                    <FontAwesomeIcon
                      className="Statistics-Card-Icon"
                      icon={faCircleXmark}
                    />
                  </p>
                  <h2>{props.prop1 - props.prop3 - 1}</h2>
                  <p>Incorrect Answer</p>
                </div>
              </Col>
              <Col xs lg="3">
                <div className="Statistics-Card">
                  <p>
                    <FontAwesomeIcon
                      className="Statistics-Card-Icon"
                      icon={faAward}
                    />
                  </p>
                  <h2>{props.prop2}</h2>
                  <p>Total Score</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default GameStatistics;
