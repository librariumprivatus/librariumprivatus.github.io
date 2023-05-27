import * as React from "react";
import {useParams} from "react-router-dom";
import {GridSizeGlobalContext, useGlobalStore} from "../Elements/GlobalStore";
import {AiOutlineLink, BiLinkAlt, BsLink45Deg, HiLink, HiOutlineLink, ImLink,
    IoIosLink, SlMagnifierAdd, SlMagnifierRemove} from "react-icons/all";
import {useContext} from "react";
import {useCookies} from "react-cookie";
import * as Config from "../Config/Config";

function GridSizePreferences() {
    const contextGridSize = useContext(GridSizeGlobalContext);

    const minGridSize = 1
    const maxGridSize = 6

    const [cookies, setCookie] = useCookies(['gridSize']);

    function plus() {
        contextGridSize.gridSize = Math.min(contextGridSize.gridSize+1, maxGridSize)
        setCookie('gridSize', contextGridSize.gridSize, { path: '/' })
    }

    function minus() {
        contextGridSize.gridSize = Math.max(contextGridSize.gridSize-1, minGridSize)
        setCookie('gridSize', contextGridSize.gridSize, { path: '/' })
    }
    return (<div className={"mb-4"}>
        <div className="btn-group px-2" role="group" aria-label="Basic example">
            <button onClick={plus} type="button" className="btn btn-outline-primary"><SlMagnifierRemove/> More</button>
            <button onClick={minus} type="button" className="btn btn-outline-primary"><SlMagnifierAdd/> Less</button>
        </div>
        contextGridSize.gridSize: {contextGridSize.gridSize}

        </div>);
}


function CookiesPreferences() {
    const [cookies, setCookie] = useCookies(['gridSize']);

    return (<div>
        Cookies gridSize: {cookies.gridSize}</div>);
}

function MSOneDrivePreferences() {

    const context = useGlobalStore()

    let valueURL = "MS One Drive Shared URL"
    if(context.sharepointURL !== ""){
        valueURL = context.sharepointURL
    }

    const buttonName = "Set URL"

    function handleChange(event: { target: { value: string; }; }){
        context.sharepointURL = event.target.value
    }


    // @ts-ignore
    return (<div className={"mb-3"} style={{maxWidth: 900}}>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                <ImLink/>&nbsp; MS One Drive URL
            </span>
            <div className="form-floating">
                <input type="text" className="form-control" name="code1" placeholder="Code 1" onChange={handleChange}/>
                    <label htmlFor="code1">
                        {context.sharepointURL}</label>
            </div>
            <button className="input-group-text btn btn-outline-secondary" type="button" id="button-addon2">
                {buttonName}</button>
        </div>
    </div>);
}


function JSONSlistLoaded() {


    return (<div>
        <ul>
            {Config.jsons.map((json) =>
            {return <li>
                <a href={json.url.href}>
                    {json.url.pathname.split('/').pop()}</a>
                </li>})}
        </ul>
    </div>);
}


function Preferences() {
    const context = useGlobalStore()

    return (<>
        <h4>Preferences</h4>
        <div className={"container"}>

            <h5>🍏 GridSizePreferences</h5>
            <GridSizePreferences/>

            <h5>🍎 Cookies Preferences</h5>
            <CookiesPreferences/>

            <h5>🍐 MS One Drive Preferences</h5>
            <MSOneDrivePreferences/>
            <div>
                URL {context.sharepointURL}
            </div>

            <h5>🍊 JSONS</h5>
            <JSONSlistLoaded/>




            <h5> 🍋 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕</h5>

        </div></>);
}

export default Preferences
