import * as React from "react";
import Navigation from "./Navigation";
import {HeaderTitle} from "./HeaderTitle";
import {WelcomeLinkSharepoint} from "../Elements/Sharepoint";


function Header() {
    return (<header>
        <HeaderTitle></HeaderTitle>
        <p>
            This example demonstrates some of the core features of React Router
            including nested <code>&lt;Route&gt;</code>s,{" "}
            <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
            "*" route (aka "splat route") to render a "not found" page when someone
            visits an unrecognized URL.
        </p>
        <Navigation/>
        <p>
            <WelcomeLinkSharepoint/>
        </p>


    </header>)
}

export default Header
