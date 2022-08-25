import {bootstrap} from 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Head from "next/head";
import {TopNavbar} from "../components/top-navbar/top-navbar";
import {useEffect, useState} from "react";
import {SideNavbar} from "../components/side-navbar/side-navbar";
import Script from "next/script";
import {
  getAllTokenDetails,
  getChainIds,
  getDeployedContractReference,
  getShortenedAccountNumber,
  setRoute,
} from "../utils/general-utils";
import navigationData from "../data/navigationData.json";
import {AppChainId} from "../models/component-models";
import {PopupModal} from "../components/PopupModal/popup-modal";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const [showSideNavBar, setShowSideNavBar] = useState(true);
  const [connected, setConnected] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isOnValidNetwork, setOnValidNetwork] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [chainId, setChainId] = useState("0");
  const [tokenMap, setTokenMap] = useState(new Map());
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    getChainIds(setChainId);
    console.log("ACC" + selectedAccount);
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
        // switchNetwork();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      const contract = getDeployedContractReference();
      if (contract) {
        contract.on("ActionNotifier", (observer) => {
          console.log(observer, selectedAccount);
          if (observer?.toLowerCase() === selectedAccount?.toLowerCase()) {
            // tokenMap[id] += amount;
            // console.log(tokenMap);
            // setTokenMap(new Map(tokenMap));
            if (selectedAccount && isOnValidNetwork) {
              getAllTokenDetails(selectedAccount, setTokenMap);
            }
          }
        });
      }
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (chainId !== "0") {
      console.log(AppChainId?.toLowerCase());
      console.log(chainId?.toLowerCase());
      console.log(chainId?.toLowerCase() === AppChainId?.toLowerCase());
      setOnValidNetwork(chainId?.toLowerCase() === AppChainId?.toLowerCase());
      setLoading(false);
    }
  }, [chainId]);

  useEffect(() => {
    if (selectedAccount && isOnValidNetwork) {
      getAllTokenDetails(selectedAccount, setTokenMap);
    }
  }, [isOnValidNetwork]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.error("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setConnected(true);
        setSelectedAccount(account);
        // await switchNetwork()
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setConnected(true);
      setSelectedAccount(accounts[0]);
      // await switchNetwork()
    } catch (error) {
      console.log(error);
    }
  };

  const switchNetwork = async () => {
    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x7A69" }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x7A69", // chainId: '0x13881',
                  rpcUrl: "http://localhost:8545", // rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    }
  };

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Token Mint</title>
        <meta name="description" content="Token Mint" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <TopNavbar
        accountAddress={
          selectedAccount
            ? getShortenedAccountNumber(selectedAccount)
            : "Ox0000000000000000"
        }
        storeName="Minting Store"
      />
      <div className="container-fluid p-0">
        <div className="row align-items-start">
          {
            <div className={showSideNavBar ? "col-2 margin-zero" : "col-1"}>
              <SideNavbar
                navigationData={navigationData}
                showSideNavBar={showSideNavBar}
                setRoute={setRoute}
                setShowSideNavBar={setShowSideNavBar}
              />
            </div>
          }
          <div
            className={
              showSideNavBar
                ? "col-10 relative-position"
                : "col-11 relative-position"
            }
          >
            <Component
              {...pageProps}
              connected={connected}
              selectedAccount={selectedAccount}
              isOnValidNetwork={isOnValidNetwork}
              isLoading={isLoading}
              chainId={chainId}
              tokenMap={tokenMap}
              checkNetwork={switchNetwork}
              connectWallet={connectWallet}
            />
          </div>
        </div>
      </div>
      {connected && !isOnValidNetwork && !isLoading && (
        <div>
          <PopupModal
            defaultValue="SHOW"
            hideButton={true}
            description="Change the Network"
            title="Invalid Network!!"
            func={switchNetwork}
          />

          <p>Please change to a valid Network</p>
        </div>
      )}
    </div>
  );
}

export default MyApp;
