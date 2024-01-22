import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomDropdown } from "../basic-components/CustomDropdown";
import { getTradingFromNos, getTradingToNos } from "../../utils/general-utils";
import { maxTradeValue, precision } from "../../models/component-models";
import { getRateDetails, getSaveButton } from "./popup-util";

export const PopupModal = (props) => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(1);
  const [additionalTokenId, setAdditionalTokenId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useState(() => {
    if (props?.defaultValue === "SHOW") {
      handleShow();
    }
    if (props?.defaultValue === "HIDE") {
      handleClose();
    }
  });
  const handleInput = (value) => {
    if (value > maxTradeValue) {
      setAmount(maxTradeValue);
    } else {
      setAmount(value);
    }
  };

  return (
    <div>
      {props?.hideButton === false && (
        <Button variant="primary" onClick={handleShow}>
          {props?.buttonName}
        </Button>
      )}

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton={false}>
          <Modal.Title>
            {props?.title} {" " + props?.buttonName ? props?.buttonName : ""}{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            {props?.description}
            {getRateDetails(props, setAdditionalTokenId, amount, handleInput)}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!props.onlyClose &&
            getSaveButton(props, amount, handleClose, additionalTokenId)
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};
