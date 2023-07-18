import { NavLink } from "react-router-dom";
import { sideLinks } from "../assets/data/sideLinks";
import "./Styles/sidebar.css";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBars } from "react-icons/fa";


const Sidebar = ({ setOpenModal }) => {
  const [switchIcon, setSwitchIcon] = useState(false);

  return (
    <div className="sidebar">
      <div className="nav-logo">
        <span className="logo"> LOGO</span> 

      </div>
      <div className="sidebar_content">
        <div className="menu">
          {sideLinks.map((item, index) => (
            <div className="sidebar_menu" key={index}>
              <NavLink
                to={item.path}
                className={(sideClass) =>
                  sideClass.isActive
                    ? "sidebar_active sidebar_link"
                    : "sidebar_link"
                }
              >
                <item.icon className="icon" />
                <span>{item.display}</span>
              </NavLink>
            </div>
          ))}

          {/* Logout */}
          <div className="sidebar_menu sidebar_bottom" onClick={() => setOpenModal(true)}>
            <HiOutlineLogout className="icon" />
            <span
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
