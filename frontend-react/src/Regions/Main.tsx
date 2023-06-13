import * as React from "react";
import {Outlet} from "react-router-dom";
import {ProviderGlobalContext} from "../Elements/ProviderContext";
import { CookiesProvider } from 'react-cookie';

function Main() {
    return (
        <main className={"mb-5"}>
            <CookiesProvider>
                <ProviderGlobalContext>
                    <Outlet />
                </ProviderGlobalContext>
            </CookiesProvider>
        </main>
    );
}

export default Main
