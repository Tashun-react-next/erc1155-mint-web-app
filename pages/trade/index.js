import { getCard } from "../../components/basic-components/card";
import { getTradingFromNos, transferToken } from "../../utils/general-utils";
import { tradeButtonName } from "../../models/component-models";

const Index = ({ tokenMap, cardViewData, setProcessing }) => {
  return (
    <div className="container">
      <div className="d-flex flex-row pt-5 row-cols-4 row">
        {cardViewData?.map((value, key) => {
          if (getTradingFromNos().includes(value.no)) {
            value.key = key;
            value.showButton = true;
            value.buttonName = tradeButtonName;
            value.showBalance = true;
            value.showRate = false;
            value.showDropdownView = true;
            value.setLoading = setProcessing;
            value.onClickFunction = transferToken;
            value.balance = tokenMap.get(value.no);
            return getCard(value);
          }
        })}
      </div>
    </div>
  );
};

export default Index;
