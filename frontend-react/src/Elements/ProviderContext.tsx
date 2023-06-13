import React, {createContext, useContext} from "react";
import useSWR from "swr";
import axios from "axios";
import * as Config from "../Config/Config";
import {useCookies} from "react-cookie";

const defaultGlobalStoreData = {
    elements: {},
    tree: {
        'defaultBiblioteka': {}
    },
    books: [],
    booksByMonths: {
        'defaultMonths': [],
    },
    months: [],
    gridSize: 4,
    sharepointURL: "sharepointURL-default"
}

export const GlobalStoreContext = React.createContext(
    defaultGlobalStoreData)

export const GridSizeContext = React.createContext({
    gridSize: 4,
    setGridSize: (value: number) => {},
})

export function useGlobalStore() {
    const context = React.useContext(GlobalStoreContext);
    if (!context) {
        throw new Error("You forgot to wrap GlobalStoreProvider")}
    return context
}

const fetcher = async (url: string) => await axios.get(url).then((res) => res.data)


export function ProviderGlobalContext(props: any) {

    let contextData = defaultGlobalStoreData

    Config.jsons.map((json) =>{
        const swr = useSWR(json.url, fetcher)

        const json_details = <a href={json.url.href}>{json.url.pathname.split('/').pop()})</a>

        if (swr.error) return (
            <p>🔴 Failed to fetch. ({json_details})</p>)

        if (swr.isLoading) return (
            <p>🟡 Loading....({json_details})</p>)


        const key = json.context_name
        // @ts-ignore
        contextData[key as keyof typeof contextData] = swr.data.data
        })

    const contextGridSize = useContext(GridSizeContext)

    const [cookies, setCookie] = useCookies([Config.cookies_gridSize]);

    if(isNaN(parseInt(cookies.gridSize))){
        setCookie(Config.cookies_gridSize, contextGridSize.gridSize, { path: '/' })}

    if(!isNaN(parseInt(cookies.gridSize))){
        contextGridSize.gridSize = parseInt(cookies.gridSize)}

    return (<>
        <GlobalStoreContext.Provider value={contextData}>
            <GridSizeContext.Provider value={contextGridSize}>
                {props.children}
            </GridSizeContext.Provider>
        </GlobalStoreContext.Provider>
    </>)
}








