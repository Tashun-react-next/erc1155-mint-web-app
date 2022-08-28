import cardData from "../data/cardData.json";
import { getTokenUpdatedPrice } from "../utils/general-utils";
import { BehaviorSubject, from } from "rxjs";

export const getUpdatedCardData = () => {
  const returningSubject = new BehaviorSubject();
  cardData.forEach((data) => {
    const subscription = getTokenUpdatedPrice(data?.no).subscribe(
      (returnData) => {
        data.rate = returnData;
        returningSubject.next(cardData);
        subscription.unsubscribe();
      }
    );
  });
  return returningSubject.asObservable();
};
