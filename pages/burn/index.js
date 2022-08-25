import cardData from "../../data/cardData.json";
import { getCard } from "../../components/basic-components/card";
import { burnToken, getForgingNos } from "../../utils/general-utils";
import { burnButtonName } from "../../models/component-models";

const Index = ({ tokenMap }) => {
  return (
    <div className="container">
      <div className="d-flex flex-row pt-5 w-20">
        {cardData.map((value, key) => {
          if (getForgingNos().includes(value.no)) {
            value.key = key;
            value.showButton = true;
            value.buttonName = burnButtonName;
            value.showBalance = true;
            value.showDropdownView = false;
            value.onClickFunction = burnToken;
            value.balance = tokenMap.get(value.no);
            return getCard(value);
          }
        })}
      </div>
    </div>
  );
};

export default Index;
