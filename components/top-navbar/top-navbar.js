import Link from "next/link";

export const TopNavbar = (props) => {
    return (
        <nav className="navbar navbar-light navbar-color">
            <div  className="logo navbar-brand m-3"> Minting Store</div>
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <a className="nav-link" href='/mint/token1-mint'>Home</a>
                </li>
            </ul>
            <Link href='/mint/token1-mint'>Home</Link>
            <Link href='/mint/token1-mint'>Home</Link>
            <Link href='/mint/token1-mint'>Home</Link>
            <Link href='/mint/token1-mint'>Home</Link>


        </nav>
    );
}

