import {bootstrap} from "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Head from "next/head";
import {TopNavbar} from "../components/top-navbar/top-navbar";
import {useEffect, useState} from "react";
import {SideNavbar} from "../components/side-navbar/side-navbar";
import Script from "next/script";
import {
    checkIfWalletIsConnected,
    connectWallet,
    getAllTokenDetails,
    getChainIds,
    getDeployedContractReference,
    getIndexFromNavigation,
    getShortenedAccountNumber,
    setEventListener,
    setRoute,
    switchNetwork,
} from "../utils/general-utils";
import navigationData from "../data/navigationData.json";
import {AppChainId, RCP_URL} from "../models/component-models";
import {PopupModal} from "../components/PopupModal/popup-modal";
import {useRouter} from "next/router";
import {getUpdatedCardData} from "../services/data-interaction-service";
import CustomLoader from "../components/basic-components/Loader";

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [showSideNavBar, setShowSideNavBar] = useState(true);
    const [connected, setConnected] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isOnValidNetwork, setOnValidNetwork] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isProcessing, setProcessing] = useState(true);
    const [chainId, setChainId] = useState("0");
    const [tokenMap, setTokenMap] = useState(new Map());
    const [navigation, setNavigation] = useState(null);
    const [cardViewData, setCardViewData] = useState(null);
    const [isError, setError] = useState(null);

    useEffect(() => {
        setProcessing(true);
        checkIfWalletIsConnected(setError, setConnected, setSelectedAccount);
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
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
            setEventListener(
                selectedAccount,
                isOnValidNetwork,
                setTokenMap,
                setProcessing
            );
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
            setEventListener(
                selectedAccount,
                isOnValidNetwork,
                setTokenMap,
                setProcessing
            );
            setupCardViewSubscription();
            setProcessing(false);
        }
    }, [isOnValidNetwork]);

    useEffect(() => {
        setNavigation(getIndexFromNavigation(router.asPath));
    }, [router.query]);

    // const checkIfWalletIsConnected = async () => {
    //     try {
    //         const {ethereum} = window;
    //
    //         if (!ethereum) {
    //             console.error("Make sure you have metamask!");
    //             return;
    //         } else {
    //             console.log("We have the ethereum object", ethereum);
    //         }
    //
    //         const accounts = await ethereum.request({method: "eth_accounts"});
    //
    //         if (accounts.length !== 0) {
    //             const account = accounts[0];
    //             console.log("Found an authorized account:", account);
    //             setConnected(true);
    //             setSelectedAccount(account);
    //             // await switchNetwork()
    //         } else {
    //             console.log("No authorized account found");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const setupCardViewSubscription = () => {
        getUpdatedCardData().subscribe((data) => setCardViewData(data));
    };

    // /**
    //  * Implement your connectWallet method here
    //  */
    // const connectWallet = async () => {
    //     try {
    //         const {ethereum} = window;
    //
    //         if (!ethereum) {
    //             alert("Get MetaMask!");
    //             return;
    //         }
    //
    //         const accounts = await ethereum.request({
    //             method: "eth_requestAccounts",
    //         });
    //
    //         console.log("Connected", accounts[0]);
    //         setConnected(true);
    //         setSelectedAccount(accounts[0]);
    //         // await switchNetwork()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    //  const switchNetwork = async () => {
    //     // Check if MetaMask is installed
    //     // MetaMask injects the global API into window.ethereum
    //     if (window.ethereum) {
    //         try {
    //             // check if the chain to connect to is installed
    //             await window.ethereum.request({
    //                 method: "wallet_switchEthereumChain",
    //                 params: [{chainId: AppChainId}], // chainId must be in hexadecimal numbers
    //             });
    //         } catch (error) {
    //             // This error code indicates that the chain has not been added to MetaMask
    //             // if it is not, then install it into the user MetaMask
    //             if (error.code === 4902) {
    //                 try {
    //                     await window.ethereum.request({
    //                         method: "wallet_addEthereumChain",
    //                         params: [
    //                             {
    //                                 chainId: AppChainId,
    //                                 rpcUrl: RCP_URL,
    //                             },
    //                         ],
    //                     });
    //                 } catch (addError) {
    //                     console.error(addError);
    //                 }
    //             }
    //             console.error(error);
    //         }
    //     } else {
    //         // if no window.ethereum then MetaMask is not installed
    //         alert(
    //             "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    //         );
    //     }
    // };

    const setNavigationRoute = (path) => {
        setRoute(router, path);
    };

    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Token Mint</title>
                <meta name="description" content="Token Mint"/>
                <link rel="icon" href="/logo.png"/>
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
                                activeIndex={navigation}
                                setRoute={setNavigationRoute}
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
                        {isProcessing && (
                            <div className="d-flex flex-row justify-content-center">
                                <CustomLoader type={"spinningBubbles"} color={"#fff"}/>
                            </div>
                        )}
                        {!isProcessing && (
                            <Component
                                {...pageProps}
                                cardViewData={cardViewData}
                                connected={connected}
                                selectedAccount={selectedAccount}
                                isOnValidNetwork={isOnValidNetwork}
                                isLoading={isLoading}
                                setProcessing={setProcessing}
                                chainId={chainId}
                                tokenMap={tokenMap}
                                setError={setError}
                                setSelectedAccount={setSelectedAccount}
                                setConnected={setConnected}
                                checkNetwork={() => switchNetwork(setError)}
                                connectWallet={connectWallet}
                            />
                        )}
                    </div>
                </div>
            </div>
            {connected && !isOnValidNetwork && !isLoading && (
                <div>
                    <PopupModal
                        defaultValue="SHOW"
                        hideButton={true}
                        description="Change the Network to Mumbai"
                        title="Invalid Network!!"
                        saveButtonName={"Change Network"}
                        setError={setError}
                        func={() => switchNetwork(setError)}
                    />

                    <p>Please change to a valid Network</p>
                </div>
            )}
            {isError && (
                <PopupModal
                    defaultValue={isError ? "SHOW" : "HIDE"}
                    hideButton={true}
                    description={isError}
                    title="Error!!"
                />
            )}

            {isLoading && <div></div>}
            {!isLoading && <div></div>}
        </div>
    );
}

export default MyApp;
