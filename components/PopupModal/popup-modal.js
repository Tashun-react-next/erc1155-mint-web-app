import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomDropdown } from "../basic-components/CustomDropdown";
import { getTradingFromNos, getTradingToNos } from "../../utils/general-utils";

export const PopupModal = (props) => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [dropDownSelection, setDropDownSelection] = useState(new Map());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useState(() => {
    if (props?.defaultValue === "SHOW") {
      handleShow();
    }
  });
  const handleInput = (value) => {
    if (value > 1000) {
      setAmount(1000);
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
            {props?.title + " " + props?.buttonName ? props?.buttonName : ""}{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            {props?.description}

            {(props?.rate || props?.rate === 0 || props?.rate > 0) && (
              <div>
                <div className="d-flex flex-row justify-content-center">
                  <p>Maximum tokens per transfer is 1000</p>
                </div>
                {props?.showDropdownView && (
                  <div>
                    <div className="d-flex flex-row justify-content-center">
                      <div className="start-0 me-5">Select Token 1</div>
                      <div className="start-0">Select Token 2</div>
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                      <div className="start-0 me-5">
                        <CustomDropdown
                          index={0}
                          func={setDropDownSelection}
                          title="-"
                          menuItemData={getTradingFromNos()}
                        />
                      </div>
                      <div className="start-0 ms-5">
                        <CustomDropdown
                          index={1}
                          func={setDropDownSelection}
                          title="-"
                          menuItemData={getTradingToNos()}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex  flex-wrap mt-3 mb-1 justify-content-center">
                  <input
                    id="amount-input"
                    type={"number"}
                    value={amount}
                    onChange={(e) => handleInput(e.target.value)}
                    min={1}
                    max={1000}
                  />
                  <div className="d-flex flex-column flex-wrap m-2">
                    Price :{" "}
                    {props?.rate > 0
                      ? Math.round(props?.rate * amount * 10000) / 10000
                      : "Free"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!props?.showDropdownView && (
            <Button
              variant="primary"
              onClick={() => {
                props.func(props?.id, amount);
                handleClose();
              }}
            >
              Save Changes
            </Button>
          )}
          {props?.showDropdownView && (
            <Button
              variant="primary"
              onClick={() => {
                props.func(
                  dropDownSelection?.get(0),
                  dropDownSelection?.get(1),
                  amount
                );
                handleClose();
              }}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
