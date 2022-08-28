import { getCard } from "../../components/basic-components/card";
import { getMintingNos, mintToken } from "../../utils/general-utils";
import { mintButtonName } from "../../models/component-models";

const Index = ({ tokenMap, cardViewData, setProcessing }) => {
  return (
    <div className="container">
      <div className="d-flex flex-row pt-5">
        {cardViewData?.map((value, key) => {
          if (getMintingNos().includes(value.no)) {
            value.key = key;
            value.showButton = true;
            value.buttonName = mintButtonName;
            value.showBalance = true;
            value.showRate = false;
            value.showDropdownView = false;
            value.addLoading = true;
            value.onClickFunction = mintToken;
            value.setLoading = setProcessing;
            value.balance = tokenMap.get(value.no);
            return getCard(value);
          }
        })}
      </div>
    </div>
  );
};

export default Index;
