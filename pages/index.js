import { getCard } from "../components/basic-components/card";
import { getUpdatedCardData } from "../services/data-interaction-service";
import { useEffect, useState } from "react";
import CustomLoader from "../components/basic-components/Loader";
// import detectEthereumProvider from '@metamask/detect-provider';

export default function Home({
  connected,
  isOnValidNetwork,
  tokenMap,
  connectWallet,
  cardViewData,
  setError,
  setConnected,
  setSelectedAccount,
}) {
  return (
    <div className="">
      {!connected && (
        <div>
          <span className=" d-flex  align-items-center flex-column pt-5">
            <div className="border d-flex flex-column">
              <div className="card" style={{ width: "25rem" }}>
                <img src="/welcome.webp" className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <p className="card-text ">Helllooo!!! </p>
                  <p className="card-text">Welcome to Minting Store</p>
                  <p className="card-text">
                    Let's Mint some stuff and have some fun !!
                  </p>
                </div>
              </div>
            </div>
          </span>
          <span className=" d-flex  align-items-center flex-column pt-5">
            <div className="border d-flex flex-column">
              <div className="card" style={{ width: "25rem" }}>
                <div className="card-body text-center">
                  <p className="card-text ">Let's Get Started!! </p>
                  <p className="card-text">Connect your wallet</p>
                  <button
                    type="mt-5 button"
                    className="btn btn-primary"
                    onClick={() =>
                      connectWallet(setError, setConnected, setSelectedAccount)
                    }
                  >
                    Connect your wallet
                  </button>
                </div>
              </div>
            </div>
          </span>
        </div>
      )}{" "}
      {connected && isOnValidNetwork && cardViewData && (
        <div>
          <div className="container">
            <div className="d-flex flex-row pt-5 row-cols-4 row">
              {cardViewData?.map((value, key) => {
                // value.
                value.key = key;
                value.showBalance = true;
                value.showButton = false;
                value.balance = tokenMap?.get(value.no);
                return getCard(value);
              })}
            </div>
          </div>
        </div>
      )}
      {connected && !isOnValidNetwork && (
        <div>Please Switch networks you are in a wrong network</div>
      )}
    </div>
  );
}
