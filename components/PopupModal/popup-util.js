import { maxTradeValue, precision } from "../../models/component-models";
import { CustomDropdown } from "../basic-components/CustomDropdown";
import { getTradingToNos } from "../../utils/general-utils";
import React from "react";
import Button from "react-bootstrap/Button";

export const getRateDetails = (
  props,
  setAdditionalTokenId,
  amount,
  handleInput
) => {
  return (
    (props?.rate || props?.rate === 0 || props?.rate > 0) && (
      <div>
        <div className="d-flex flex-row justify-content-center">
          <p>Maximum tokens per transfer is {maxTradeValue}</p>
        </div>
        {props?.showDropdownView && (
          <div className="m-2">
            <hr />
            <div className="d-flex flex-row justify-content-center m-2">
              <div className="start-0">
                Select Token that you need to receive
              </div>
            </div>
            {getDropdownView(setAdditionalTokenId)}
          </div>
        )}
        <hr />
        {amountSelectionView(props, amount, handleInput)}
      </div>
    )
  );
};

export const getSaveButton = (
  props,
  amount,
  handleClose,
  additionalTokenId
) => {
  return (
    <div>
      {!props?.showDropdownView &&
        getButtonWithTwoInputFunction(props, amount, handleClose)}
      {props?.showDropdownView &&
        getButtonWithThreeInputFunction(
          props,
          amount,
          handleClose,
          additionalTokenId
        )}
    </div>
  );
};

// ================================ simple component functions ============================

const getButtonWithTwoInputFunction = (props, amount, handleClose) => {
  return (
    <Button
      variant="primary"
      onClick={() => {
        props.func(props?.id, amount);
        handleClose();
        if (props?.addLoading) {
          props.setLoading(true);
        }
      }}
    >
      {props?.saveButtonName ? props?.saveButtonName : "Save Changes"}
    </Button>
  );
};
const getButtonWithThreeInputFunction = (
  props,
  amount,
  handleClose,
  additionalTokenId
) => {
  return (
    <Button
      variant="primary"
      onClick={() => {
        props.func(props?.id, additionalTokenId, amount);
        handleClose();
        if (props?.addLoading) {
          props.setLoading(true);
        }
      }}
    >
      {props?.buttonName ? props?.buttonName : "Save Changes"}
    </Button>
  );
};

const amountSelectionView = (props, amount, handleInput) => {
  return (
    <div className="d-flex  flex-wrap mt-3 mb-1 justify-content-center">
      <input
        id="amount-input"
        type={"number"}
        value={amount}
        onChange={(e) => handleInput(e.target.value)}
        min={1}
        max={maxTradeValue}
      />
      <div className="d-flex flex-column flex-wrap m-2">
        Price :{" "}
        {props?.rate > 0 && props?.showRate
          ? Math.round(props?.rate * amount * precision) / precision
          : "Free"}
      </div>
    </div>
  );
};

const getDropdownView = (setAdditionalTokenId) => {
  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="start-0 ">
        <CustomDropdown
          index={0}
          func={setAdditionalTokenId}
          title="-"
          menuItemData={getTradingToNos()}
        />
      </div>
    </div>
  );
};
