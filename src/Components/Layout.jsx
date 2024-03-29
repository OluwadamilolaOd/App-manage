import Header from "./Header";
import Sidebar from "./Sidebar";
import Router from "../router/Router";

const Layout = (props) => {
  return (
    <>
      <div className="layout">
        <Sidebar setOpenModal={props.setOpenModal} className="sidebar" />

        <div className="main_layout">
          <Header />

          <div className="content">
            <Router />
          </div>

        </div>
      </div>
    </>
  );
};

export default Layout;
