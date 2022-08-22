import {bootstrap} from 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Head from "next/head";
import Link from "next/link";
import {TopNavbar} from "../components/top-navbar/top-navbar";
import {useEffect} from "react";
import Script from "next/script";
import {SideNavbar} from "../components/side-navbar/side-navbar";
import {getShortenedAccountNumber} from "../utils/general-utils";
import {Example} from "../components/PopupModal/popup-modal";

function MyApp({Component, pageProps}) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Token Mint</title>
                <meta name="description" content="Token Mint"/>
                <link rel="icon" href="/logo.png"/>

            </Head>
            <TopNavbar accountAddress = {getShortenedAccountNumber("0x5C0122Eb7AE6F776E63A1294c1dd0d66FB221F6e")} storeName="Minting Store" />
            <div className="container-fluid body-class p-0" >
                <div className="row align-items-start">
                    <div className="col-3 margin-zero" >
                        <SideNavbar/>
                    </div>
                    <div className="col-9 d-flex flex-wrap">
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
           <Example/>
        </div>
    )
}

export default MyApp
