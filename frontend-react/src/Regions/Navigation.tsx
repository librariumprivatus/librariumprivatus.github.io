import * as React from "react";
import {menuList, menuList2} from "../App";
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <>
            <nav>
                <ul>
                    {menuList2.map((menuItem: any) => {
                        return (
                            <li key={menuItem.path}>
                                <Link to={menuItem.path}>{menuItem.title}</Link>
                            </li>)
                    })}
                </ul>
            </nav>
        </>
    );
}

export default Navigation
