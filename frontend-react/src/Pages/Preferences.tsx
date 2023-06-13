import * as React from "react";
import {useParams} from "react-router-dom";
import {GridSizeContext, useGlobalStore} from "../Elements/ProviderContext";
import {
    AiOutlineLink, BiLinkAlt, BsLink45Deg, FaCat, FaExpandArrowsAlt, FaModx, HiLink, HiOutlineLink, ImLink,
    IoIosLink, SlMagnifierAdd, SlMagnifierRemove
} from "react-icons/all";
import {useContext} from "react";
import {useCookies} from "react-cookie";
import * as Config from "../Config/Config";

function GridSizePreferences() {
    const contextGridSize = useContext(GridSizeContext);

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
        <div className="btn-group btn-group-sm px-2" role="group" aria-label="Basic example">
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
                    <label className={"form-control-sm"} htmlFor="code1">
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
            {return <li key={json.url.href}>
                <a href={json.url.href}>
                    {json.url.pathname.split('/').pop()}</a>
                </li>})}
        </ul>
    </div>);
}


function Preferences() {
    const context = useGlobalStore()

    return (<>
        <h4>🔮 Preferences</h4>
        <div className={"container"}>

            <ul>
                <li key={'🍏 GridSizePreferences'}>
                    <h5>🍏 GridSizePreferences</h5>
                    <GridSizePreferences/>
                    <div className={"mb-4"}/></li>
                <li key={'🍎 Cookies Preferences'}>
                    <h5>🍎 Cookies Preferences</h5>
                    <CookiesPreferences/>
                    <div className={"mb-4"}/></li>
                <li key={'🍐 MS One Drive Preferences'}>
                    <h5>🍐 MS One Drive Preferences</h5>
                    <div className={"mb-2"}>URL: {context.sharepointURL}</div>
                    <MSOneDrivePreferences/>
                    <div className={"mb-4"}/></li>
                <li key={'🍊 JSONS'}>
                    <h5>🍊 JSONS</h5>
                    <JSONSlistLoaded/>
                    <div className={"mb-4"}/></li>
                <li key={' 🍋 🍏 🍎 🍐 🍊 🍋'}>
                    <h5> 🍋 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕</h5>
                    <FaModx/>
                    <FaCat/>
                    <FaExpandArrowsAlt/></li>
            </ul>

        </div></>);
}

export default Preferences
