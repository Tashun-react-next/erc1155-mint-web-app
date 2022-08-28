import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";

export const CustomDropdown = (props) => {
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(props?.title);
  }, []);
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ width: "110%", "max-width": "100%" }}
      >
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props?.menuItemData.map((value, index) => {
          return (
            <Dropdown.Item
              key={index}
              value={value}
              onClick={() => {
                props?.func(value);
                setTitle(value);
              }}
            >
              {value}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
