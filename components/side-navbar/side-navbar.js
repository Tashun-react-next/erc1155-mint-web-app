import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SideNavbar = (props) => {
  // const [activeIndex, setActiveIndex] = useState(0);
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
      // navigationData[idx].isSelected = true;
      // navigationData[activeIndex].isSelected = false;
      // setActiveIndex(idx);
      props.setRoute(props.navigationData[idx].link);
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
            props?.activeIndex === idx
              ? "nav-link active"
              : "nav-link text-white"
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
        {navigationData?.map((value) => {
          return getInActiveNavBarItem(value, value?.index);
        })}
      </ul>
      <hr />
    </div>
  );
};
