import home from '../images/home-black.svg';
import license from '../images/license-black.png'
import organization from '../images/organization-black.svg'
import homeW from '../images/home-white.svg'
import licenseW from '../images/license-white.svg'
import organizationW from '../images/organization-white.svg'
import {GrHomeRounded} from "react-icons/gr";
import {MdOutlineDataThresholding} from "react-icons/md"
import {HiOutlineChartBar, HiOutlineHome} from "react-icons/hi"

export const sideLinks = [
    {
        path: "/home",
        icon: HiOutlineHome,
        // iconW: homeW,
        display: "Home",
        cName: 'nav-text',
    },
    {
        path: "/license",
        icon: HiOutlineChartBar,
        // iconW: licenseW,
        display: "License",
        cName: 'nav-text',
    },
    {
        path: "/organizations",
        icon: MdOutlineDataThresholding,
        // iconW: organizationW,
        display: "Organization",
        cName: 'nav-text',
    },

    {
        path: "/powerbi",
        icon: MdOutlineDataThresholding,
        // iconW: organizationW,
        display: "Power BI",
        cName: 'nav-text',
    }

]