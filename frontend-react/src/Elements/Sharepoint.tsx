import React from "react";
import {ImOnedrive} from "react-icons/all";
import * as Config from "../Config/Config";


export const sharepoint_url = new URL(Config.Values.sharepoint_url)
export const enter_sharepoint_url = new URL(Config.Values.enter_sharepoint_url)

const PersonalStorageNameSharepoint = sharepoint_url.pathname.split("/")[2];
// @ts-ignore
const DirNameOfBibliotekaInSharepoint = sharepoint_url.searchParams.get("id").split("/").at(-1);


function URLbaseMSOneDrive(){
    let url = "https://";
    url += sharepoint_url.hostname;
    url += "/personal/";
    url += PersonalStorageNameSharepoint;
    url += "/_layouts/15/onedrive.aspx";
    url += "?";
    url += "ga=1";

    return url;
}

function rootPathSharepoint(){
    let url = "/personal/";
    url += PersonalStorageNameSharepoint;
    url += "/Documents/";
    url += DirNameOfBibliotekaInSharepoint;
    url += "/";
    return url;
}

function URLitemMSOneDrive(path: string){
    return encodeURI(URLbaseMSOneDrive() + "&id=" + rootPathSharepoint() + path);
}


export function URLDirMSOneDrive(path: string) {
    return URLitemMSOneDrive(path);
}

export function URLFileMSOneDrive(path: string) {
    let url = URLitemMSOneDrive(path);
    url += encodeURI("&parent=");
    url += encodeURI(path.split("/").slice(0, -1).join("/"));
    return url;
}

export function FileLinkMSOneDrive(props: any){
    return(
        <a href={URLFileMSOneDrive(props.path)} target={"_blank"}>
            <ImOnedrive/> MS OneDrive
        </a>);
}


export function DirLinkMSOneDrive(props: any){
    return(
        <a href={URLDirMSOneDrive(props.path)} target={"_blank"}>
            <ImOnedrive/> MS OneDrive
        </a>);
}



export enum ItemTypeMSOneDrive {
    File,
    Dir,
}

function getTypedURL(path: string, type: ItemTypeMSOneDrive) {
    switch (type) {
        case ItemTypeMSOneDrive.Dir:
            return URLDirMSOneDrive(path);
        case ItemTypeMSOneDrive.File:
            return URLFileMSOneDrive(path);
        default:
            console.log('Bad Item Type MS One Drive');
            return 'Bad '
    }
}

// @ts-ignore
export function SharepointItemLink(props: {path: string, typeItem: ItemTypeMSOneDrive, showText: boolean}){
    let text_link = "Download"
    if (props.typeItem == ItemTypeMSOneDrive.Dir)
        text_link = "Discover"

    return(
        <a href={getTypedURL(props.path, props.typeItem)} target={"_blank"}>
            <ImOnedrive/> {props.showText && text_link}
        </a>);
}


export function WelcomeLinkSharepoint(props: any){
    return(
        <a href={enter_sharepoint_url.href}><ImOnedrive/> Authorize on MS OneDrive</a>);
}
