import { useState } from "react";
import { NavLink } from "react-router";

import {
    IconCoinMoneroFilled,
    IconUserCircle,
    IconLogout2
} from "@tabler/icons-react";

import sidebarConfig from "./sidebarConfig";
import SidebarItem from "./SidebarItem";

import "../../css/Sidebar.css"


function Sidebar({ role }) {

    const [expanded, setExpanded] = useState(false);

    const items = sidebarConfig[role] || [];

    return (

        <aside
            className={`sidebar bg-white border-end shadow-sm d-flex flex-column ${
                expanded ? "expanded" : ""
            }`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >

            {/* Brand */}

            <div className="border-bottom p-3">

                <NavLink to="/" className="navbar-brand d-flex align-items-center text-decoration-none gap-4 m-2">
                    <div className="brand-icon flex-shrink-0">
                        <IconCoinMoneroFilled size={24} />
                    </div>
                    <span className={`brand-text ${expanded ? "show-text" : ""}`}>
                        MileZero
                    </span>
                </NavLink>

            </div>

            {/* Navigation */}

            <nav className="nav nav-pills flex-column gap-2 p-3">
                {items.map((item) => (

                    <SidebarItem
                        key={item.title}
                        item={item}
                        expanded={expanded}
                    />

                ))}

            </nav>

            {/* Bottom */}

            <div className="mt-auto border-top p-3 d-flex flex-column gap-2">
                <SidebarItem
                    expanded={expanded}
                    item={{
                        title: "Profile",
                        icon: IconUserCircle,
                        path: "/profile"
                    }}
                />

                <SidebarItem
                    expanded={expanded}
                    item={{
                        title: "Logout",
                        icon: IconLogout2,
                        path: "/logout"
                    }}
                />
            </div>

        </aside>

    );

}

export default Sidebar;