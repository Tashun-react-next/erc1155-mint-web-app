import Link from "next/link";
import {CustomImage} from "../basic-components/general-components";

export const TopNavbar = (props) => {

    const getAccountAddress = (address) => {
        return(
            address &&
            <div className="pe-4 d-flex flex-wrap">
                <CustomImage
                    src="/eth-logo.png"
                    width="16px"
                    height="32px"
                />
                <div className="centered fs-5 ps-2">
                    {address}
                </div>
            </div>
        );
    }


    return (
        <nav className="navbar navbar-light navbar-color">
            <div className="d-flex flex-wrap">
                <CustomImage
                    src="/logo.png"
                    width="75px"
                    height="32px"
                    alt="Logo"
                />
                <div  className="logo navbar-brand m-3"> {props.storeName}</div>
            </div>

            {getAccountAddress(props.accountAddress)}

        </nav>
    );
}


