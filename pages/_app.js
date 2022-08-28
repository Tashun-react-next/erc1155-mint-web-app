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
    const [isProcessing, setProcessing] = useState(false);
    const [chainId, setChainId] = useState("0");
    const [tokenMap, setTokenMap] = useState(new Map());
    const [navigation, setNavigation] = useState(null);
    const [cardViewData, setCardViewData] = useState(null);
    const [isError, setError] = useState(null);

    useEffect(() => {
        // setProcessing(true);
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
            // setProcessing(false);
        }
    }, [isOnValidNetwork]);

    useEffect(() => {
        setNavigation(getIndexFromNavigation(router.asPath));
    }, [router.query]);



    const setupCardViewSubscription = () => {
        getUpdatedCardData().subscribe((data) => setCardViewData(data));
    };


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
