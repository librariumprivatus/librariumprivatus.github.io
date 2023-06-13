import * as React from "react";
import {useGlobalStore} from "../Elements/ProviderContext";

function AboutPage() {
    const context = useGlobalStore();

    return (<>
        <h1>About</h1>

        <h5>All: {context.months}</h5>
    </>)
}

export default AboutPage
