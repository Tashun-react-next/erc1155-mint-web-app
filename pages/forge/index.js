import cardData from "../../data/cardData.json";
import { getCard } from "../../components/basic-components/card";
import { forgeToken, getForgingNos } from "../../utils/general-utils";
import { forgeButtonName } from "../../models/component-models";

const Index = ({ tokenMap }) => {
  return (
    <div className="container">
      <div className="d-flex flex-row pt-5 w-20">
        {cardData.map((value, key) => {
          if (getForgingNos().includes(value.no)) {
            value.key = key;
            value.showButton = true;
            value.buttonName = forgeButtonName;
            value.showBalance = true;
            value.showDropdownView = false;
            value.onClickFunction = forgeToken;
            value.balance = tokenMap.get(value.no);
            return getCard(value);
          }
        })}
      </div>
    </div>
  );
};

export default Index;
