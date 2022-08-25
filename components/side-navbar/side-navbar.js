import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const SideNavbar = (props) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigationData, setNavigationData] = useState([]);

  useEffect(() => {
    setNavigationData(props?.navigationData ? props.navigationData : []);
  }, [props.navigationData]);

  const getNavBarItem = (name, idx) => {
    // setActiveIndex(idx);
    return (
      <li
        key={idx}
        className="nav-item"
        onClick={() => activeSelectedNavItem(idx)}
      >
        <a
          href="#"
          className={
            props.showSideNavBar ? "nav-link active" : "nav-link text-white"
          }
          aria-current="page"
        >
          <svg className="bi pe-none me-2" width="16" height="16">
            <use xlinkHref="#home2"></use>
          </svg>
          {props.showSideNavBar ? { name } : "...."}
        </a>
      </li>
    );
  };

  const activeSelectedNavItem = (idx) => {
    if (props.showSideNavBar) {
      navigationData[idx].isSelected = true;
      navigationData[activeIndex].isSelected = false;
      setActiveIndex(idx);
      props.setRoute(router, props.navigationData[idx].link);
      console.log(idx);
    } else {
      props?.setShowSideNavBar(!props?.showSideNavBar);
    }
  };

  const getInActiveNavBarItem = (value, idx) => {
    return (
      <li
        key={idx}
        className="nav-item"
        onClick={() => activeSelectedNavItem(idx)}
      >
        <a
          className={
            value.isSelected ? "nav-link active" : "nav-link text-white"
          }
        >
          {props.showSideNavBar ? value.displayName : value.shortDisplay}
        </a>
      </li>
    );
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
      style={{ height: "100vh" }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <Image
          src="/icons/1.png"
          onClick={() => props?.setShowSideNavBar(true)}
          width="50px"
          height="50px"
          alt="Expand"
        />
        {props?.showSideNavBar && (
          <span className="ps-2 fs-4">Mint your Stuff</span>
        )}
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {navigationData?.map((value, index) => {
          return getInActiveNavBarItem(value, index);
        })}
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
