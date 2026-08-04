import { useState } from "react";
import { NavLink } from "react-router";

import {
    IconChevronDown,
    IconChevronRight
} from "@tabler/icons-react";

function SidebarItem({ item, expanded }) {

    const [open, setOpen] = useState(false);

    const Icon = item.icon;

    const hasChildren = item.children?.length > 0;

    // -------------------------
    // Normal Navigation Item
    // -------------------------

    if (!hasChildren) {

        if (item.onClick) {
            return (
                <button
                    type="button"
                    onClick={item.onClick}
                    className="btn w-100 text-start rounded-3 d-flex align-items-center px-3 py-2"
                >
                    <Icon size={21} className="flex-shrink-0" />

                    <span
                        className={`sidebar-label ms-3 ${expanded ? "show-label" : ""
                            }`}
                    >
                        {item.title}
                    </span>
                </button>
            );
        }
    }

    // -------------------------
    // Dropdown Section
    // -------------------------

    return (

        <div>

            <button
                className="btn w-100 text-start d-flex align-items-center rounded-3 px-3 py-2 border-0"
                onClick={() => setOpen(!open)}
            >

                <Icon
                    size={21}
                    className="text-secondary flex-shrink-0"
                />

                <span
                    className={`sidebar-label ms-3 flex-grow-1 ${expanded ? "show-label" : ""
                        }`}
                >
                    {item.title}
                </span>

                {expanded && (

                    open

                        ? <IconChevronDown size={18} />

                        : <IconChevronRight size={18} />

                )}

            </button>

            {
                expanded &&
                open && 
                hasChildren &&(

                    <div className="mt-2 ms-5 d-flex flex-column gap-2">

                        {item.children.map((child) => (

                            <NavLink
                                key={child.title}
                                to={child.path}
                                className={({ isActive }) =>
                                    `nav-link py-1 px-2 rounded small ${isActive
                                        ? "text-primary fw-semibold"
                                        : "text-secondary"
                                    }`
                                }
                            >

                                {child.title}

                            </NavLink>

                        ))}

                    </div>

                )

            }

        </div>

    );

}

export default SidebarItem;