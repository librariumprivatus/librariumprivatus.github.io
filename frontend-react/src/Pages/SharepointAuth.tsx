import * as React from "react";
import {useEffect, useState} from "react";
import * as Config from "../Config/Config";
import {enter_sharepoint_url} from "../Elements/Sharepoint";

function SharePointAuthPage() {

    console.log("🍒 1 - SharePointAuthPage")


    let URL = "https://api.example.com/data"

    URL = enter_sharepoint_url.href


    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.example.com/data');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("🔥 ERROR: "+error);
            }
        }
        fetchData();
    }, [])

    // @ts-ignore
    console.log("🧃 49 - Puppeteer")




    console.log("🥝 99 - End SharePointAuthPage")

    return (<div>
        <h1>🦧 Share Point Auth Page</h1>

        <a href={URL}>{URL}</a>
        <div>
            {data ? <p>{data}</p> : <p>Loading...</p>}
        </div>

    </div>);
}

export default SharePointAuthPage
