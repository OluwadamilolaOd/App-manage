import { MdOutlineDataThresholding } from "react-icons/md";
import { HiOutlineChartBar, HiOutlineHome } from "react-icons/hi";
import { HiDocumentChartBar } from "react-icons/hi2";

export const sideLinks = [
  {
    path: "/home",
    icon: HiOutlineHome,
    display: "Home",
    cName: "nav-text",
  },
  {
    path: "/license",
    icon: HiOutlineChartBar,
    display: "License",
    cName: "nav-text",
  },
  {
    path: "/organizations",
    icon: MdOutlineDataThresholding,
    display: "Organization",
    cName: "nav-text",
  },

  {
    path: "/powerbi",
    icon: HiDocumentChartBar,
    display: "Report",
    cName: "nav-text",
  },
];
