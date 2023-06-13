
import * as React from "react";
import {WelcomeLinkSharepoint} from "../Elements/Sharepoint";
import Preferences from "./Preferences";


function Home() {
    return (<>
        <h1>Home</h1>
        <Preferences/>

        <WelcomeLinkSharepoint/>
    </>)
}

export default Home
