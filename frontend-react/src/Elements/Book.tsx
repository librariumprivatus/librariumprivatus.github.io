import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import * as React from "react";
import * as Config from "../Config/Config";

import "./Book.css";

// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {useGlobalStore} from "./GlobalStore";
import {ItemTypeMSOneDrive, SharepointItemLink} from "./Sharepoint";
import { TbLayoutBottombarCollapse, TbLayoutNavbarCollapse } from "react-icons/tb";
import {BsArrowDownRightSquare, BsArrowUpLeftSquare} from "react-icons/bs";
import { MdGridOff, MdGridOn } from "react-icons/md";
import {useEffect, useLayoutEffect, useRef, useState} from "react";


export function CardBook(props: any){

    const cover_book_url = new URL(props.book.cover, Config.covers_dir_url)
    let ratio;
    // @ts-ignore
    return (
            <Card className="book-card shadow mb-5 bg-body rounded-0">
                <div className={"book-card-img"} >
                    <LazyLoadImage
                        className={"card-img-top rounded-0"}
                        src={cover_book_url}
                        effect="blur"
                    />
                </div>
                <Card.Body>
                    <Card.Title>
                        {props.book.title}
                        <br/>
                        {props.book.title}
                    </Card.Title>
                </Card.Body>
            </Card>
    );
}


function Placeholder(ratio: any){
    return(
        <div data-ratio={ratio}>
            <h4>Placeholder</h4>
            <h4>Ratio:  {ratio}</h4>
        </div>
    )
}


// style={{height: 'calc(100vw*'+book.cover_ratio+'/1000)'}}

export function BookByID(props: any){
    //console.log(props.id);
    const context = useGlobalStore();
    // @ts-ignore
    let book = context.elements[props.id];
    //console.log('book', book);

    const no_cover_url = "/bg-no-book-cropped.png"
    const cover_book_url = new URL(book.cover, Config.covers_dir_url).href

    let aspectRatio =  700
    if (book.cover)
        aspectRatio = 1000/book.cover_ratio



    // @ts-ignore
    return (
        <Col>
            <Card className="book-card shadow mb-5 bg-body rounded-0">
                <div
                    className={"book-card-img"}
                    style={{
                        aspectRatio: aspectRatio
                    }}>
                    <LazyLoadImage
                        className={"card-img-top rounded-0 text-center"}
                        src={!book.cover ? no_cover_url : cover_book_url}
                        effect="blur"
                        threshold={5000}
                    />
                </div>
                <Card.Body>
                    <Card.Title>
                        {book.title}
                    </Card.Title>
                    <p>
                        <SharepointItemLink path={book.path} typeItem={ItemTypeMSOneDrive.File}/>
                    </p>
                    <p>
                        book.cover: {1000/book.cover_ratio}
                    </p>
                    <p>
                        ratio: {book.ratio}
                    </p>

                </Card.Body>
            </Card>
        </Col>
    );
}


/*
    const covers_dir_url = Config.data_repo_url+"/"+Config.store_dir+"/"+Config.covers_dir;
    const cover_src = covers_dir_url+"/"+element.cover;





 */

/*

<strong>🔹 {element.title}</strong> <LinkMSOneDrive path={element.relative}/>


<p><LinkMSOneDrive path={book.relative}/></p>


 */



export function BookLisItem(props: any){
    const context = useGlobalStore();
    // @ts-ignore
    let element = context.elements[props.id]
    return(
        <div className={'book-list-item mb-1'}>
            <div className={'text-book-list-item'}>
                <strong>🔹 {element.title}</strong>
                <small className={"text-muted px-1"} style={{display: "none"}}>ID: {props.id}</small>

                <small className={"px-1"}><SharepointItemLink path={element.path} typeItem={ItemTypeMSOneDrive.File}/></small>

            </div>
        </div>
    );
}


const showIconsText = false;

const showStatusText = true;


const hideBRtag = "";

export function DirListItem(props: any){


    const [gridView, setGridView] = useState<boolean>(true)

    const [collapsed, setCollapsed] = useState<boolean>(true)
    const [childCollapsed, setChildCollapsed] = useState<boolean>(true)

    const [makeChildCollapsed, setMakeChildCollapsed] = useState<boolean>(true)
    const [makeChildGlobalCollapsed, setMakeChildGlobalCollapsed] = useState<boolean>(true)

    //const observedDiv = useRef(null);
    const [height, setHeight] = useState(0);
    /*
    useLayoutEffect(() => {
        // @ts-ignore
        setHeight(observedDiv.current.offsetHeight);
    }, []);
    */

    const observedDiv = useRef(null);

    useEffect(() => {
            if (!observedDiv.current) {
                // we do not initialize the observer unless the observedDiv has
                // been assigned
                return;
            }

            // we also instantiate the resizeObserver and we pass
            // the event handler to the constructor
            const resizeObserver = new ResizeObserver(() => {
                // @ts-ignore
                if(observedDiv.current.offsetHeight !== height) {
                    // @ts-ignore
                    setHeight(observedDiv.current.offsetHeight);
                }
            });

            resizeObserver.observe(observedDiv.current);


            // if useEffect returns a function, it is called right before the
            // component unmounts, so it is the right place to stop observing
            // the div
            return function cleanup() {
                resizeObserver.disconnect();
            }
        },
        // only update the effect if the observedDiv element changed
        [observedDiv.current])







    useEffect(() => {
        if(props.parentGlobalCollapsed !== collapsed){
            setCollapsed(props.parentGlobalCollapsed)

            setMakeChildGlobalCollapsed(props.parentGlobalCollapsed)
        }
    }, [props.parentGlobalCollapsed])

    useEffect(() => {
        if(props.parentCollapsed !== collapsed){
            setCollapsed(props.parentCollapsed)
        }
    }, [props.parentCollapsed])


    function handleClickCollapse(){
        setCollapsed(existingValue => !existingValue)
    }

    function handleClickChildCollapse(){
        setChildCollapsed(existingValue => !existingValue)
        setMakeChildCollapsed(childCollapsed)
    }

    function handleClickGlobalChildCollapse(){
        setChildCollapsed(existingValue => !existingValue)
        setMakeChildCollapsed(childCollapsed)
        setMakeChildGlobalCollapsed(childCollapsed)
    }


    const context = useGlobalStore();
    // @ts-ignore
    const element = context.elements[props.id]

    let level: number = 1
    if (props.level !== undefined)
        level += props.level

    let sumHeight: number = height
    let parentSumHeight: number = 0
    if (props.sumHeight !== undefined)
        parentSumHeight = props.sumHeight

    if (props.sumHeight !== undefined)
        sumHeight += props.sumHeight


    let dirs = []
    let files = []

    for (var key  in props.childs) {
        // @ts-ignore
        if(context.elements[key]["type"] === "dir"){
            dirs.push(key)
        }else{
            files.push(key)
        }
    }


    function compareElems(a: any, b: any) {
        // @ts-ignore
        if (context.elements[a]["title"] > context.elements[b]["title"]) {
            return 1;
        }
        // @ts-ignore
        if (context.elements[a]["title"] < context.elements[b]["title"]) {
            return -1;
        }
        return 0;
    }

    const sdirs = dirs.sort(compareElems);

    const sfiles = files.sort(compareElems);


    return (
        <div className={'mb-2 d-flex flex-column'}>
            <div className={"sticky d-inline-flex"} ref={observedDiv} style={{top: parentSumHeight, zIndex: 99-level}}>
                <div className={"tree-dir-title"}>
                    <strong>🗂 {element.title}</strong></div>
                <div className={"tree-dir-title-navigations d-inline-flex"}>
                    <a className="link-danger px-1" onClick={handleClickCollapse}>
                        {collapsed ? <TbLayoutBottombarCollapse/> : <TbLayoutNavbarCollapse/> }
                        {showIconsText && <>
                            &nbsp;
                            {collapsed ? "Collapse Down": "Collapse Up"}</>}</a>


                    <a className="link-primary px-1" onClick={handleClickChildCollapse}>
                        {childCollapsed ? <TbLayoutNavbarCollapse/> : <TbLayoutBottombarCollapse/>}
                        {showIconsText && <>
                            &nbsp;
                            {childCollapsed ? "Collapse Down": "Collapse Up"}</>}</a>


                    <a className="link-primary px-1" onClick={handleClickGlobalChildCollapse}>
                        {childCollapsed ? <BsArrowUpLeftSquare/> : <BsArrowDownRightSquare/>}
                        {showIconsText && <>
                            &nbsp;
                            {childCollapsed ? "Global Collapse Down": "Global Collapse Up"}</>}</a>


                </div>
            </div>

            <br className={"d-none"}/>

            <div className={"elementDescription small px-4  d-inline-flex gap-3"}>
                <span className="text-muted d-none">
                    ID: {props.id}</span>

                <div className={"d-none"}><SharepointItemLink path={element.path} typeItem={ItemTypeMSOneDrive.Dir}/></div>



                {!collapsed &&
                    <a className="link-primary"
                       onClick={() => setGridView(existingValue => !existingValue)}>
                        {gridView ? <MdGridOff/> : <MdGridOn/>}
                        {showIconsText && <>
                            &nbsp;
                            {gridView ? "Off Grid View": "On Grid View "}</>}</a>}

                {showStatusText && <>
                    <div>
                        🔹 collapsed: {collapsed ?  "🔐 Closed" : "📖 Open"}</div>
                    <div>
                        🔹 childCollapsed: {childCollapsed ?  "🔐 Closed" : "📖 Open"}</div>
                    <div>
                        🔹 gridView: {gridView? "🟢 True" : "🔴 False"}</div>
                </>}
            </div>



            <ul key={props.id} className={"pt-2"} style={{ display: collapsed ? "none" : "block" }}>
                {dirs.map((dir_id: any) => {
                    const childs_of_child = props.childs[dir_id];
                    if (childs_of_child != null) {
                        return (
                            <li key={dir_id}>
                                <DirListItem
                                    id={dir_id} childs={childs_of_child}
                                    parentCollapsed={makeChildCollapsed}
                                    parentGlobalCollapsed={makeChildGlobalCollapsed}
                                    level={level}
                                    sumHeight={sumHeight}/></li>)}
                })}
            </ul>

            <ul key={props.id} className={"pt-2"} style={{ display: collapsed ? "none" : "block" }}>
                {files.map((file_id: any) => {
                    return(
                        <li key={file_id}>
                            <BookLisItem id={file_id}/></li>)})
                }
            </ul>
        </div>
    );
}



