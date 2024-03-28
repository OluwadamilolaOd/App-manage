import { NavLink } from "react-router-dom";
import { sideLinks } from "../assets/data/sideLinks";
import "./Styles/sidebar.css";
import { HiOutlineLogout } from "react-icons/hi";
import AppManageLogo from "../assets/images/AppManage_Logo_(1).png";
import { FaWindowClose } from "react-icons/fa";
import "./Styles/header.css";


const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <div className={`sidebar ${showSidebar ? "open" : ""}`}>
      <div className="nav-logo">
        <img src={AppManageLogo} alt="Logo" className="logo" />
        <div className="close-icon" onClick={handleCloseSidebar}>
          <FaWindowClose className="menu-icon" />
        </div>
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
          <div
            className="sidebar_menu sidebar_bottom"
          >
            <HiOutlineLogout className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
