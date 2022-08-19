import Link from "next/link";
import Image from "next/image";

export const SideNavbar = (props) => {

    const getNavBarItem = (isActive, name) => {
        return (
            <li className="nav-item">
                <a href="#" className="nav-link" aria-current="page">
                    <svg className="bi pe-none me-2" width="16" height="16">
                        <use xlinkHref="#home"></use>
                    </svg>
                    {name}
                </a>
            </li>
        )
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{"width":"280px", height: "100vh"}}>
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <Image src="/icons/1.png"
                    width="50px"
                    height="50px"
                    alt="Expand"
                    />
                <span className="ps-2 fs-4">Mint your Stuff</span>
            </div>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#home"></use>
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#speedometer2"></use>
                        </svg>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#table"></use>
                        </svg>
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#grid"></use>
                        </svg>
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#people-circle"></use>
                        </svg>
                        Customers
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <a href="#"
                   className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32"
                         className="rounded-circle me-2"/>
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><Link className="dropdown-item" href="#">Sign out</Link></li>
                </ul>
            </div>

        </div>
    );
}

