import * as React from "react";
import {Outlet} from "react-router-dom";
import {GlobalStoreProvider2} from "../Elements/GlobalStore";
import { CookiesProvider } from 'react-cookie';

function Main() {
    return (
        <main>
            <CookiesProvider>
                <GlobalStoreProvider2>
                    <Outlet />
                </GlobalStoreProvider2>
            </CookiesProvider>
        </main>
    );
}

export default Main
