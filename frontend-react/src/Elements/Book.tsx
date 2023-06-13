import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import * as React from "react";
import * as Config from "../Config/Config";

import "./Book.css";

// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {GridSizeContext, useGlobalStore} from "./ProviderContext";
import {ItemTypeMSOneDrive, SharepointItemLink} from "./Sharepoint";
import { TbLayoutBottombarCollapse, TbLayoutNavbarCollapse } from "react-icons/tb";
import {BsArrowDownRightSquare, BsArrowUpLeftSquare, BsTreeFill} from "react-icons/bs";
import { MdGridOff, MdGridOn } from "react-icons/md";
import {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {FaExpandArrowsAlt, FaExternalLinkAlt} from "react-icons/all";
import Row from "react-bootstrap/Row";
import {TreeLink} from "../Pages/TreePage";


export function SingleBookFullDetails(props:any){
    let cover_book_url = "/bg-no-book-cropped.png"
    if(props.book){
        cover_book_url = new URL(props.book.cover, Config.covers_dir_url).href}

    return(<div>
        <Row>
            <Col xs={12} sm={6} md={4}>
                <div className={"text-center"}>
                    <img src={cover_book_url} alt={"COver"} className={"single-book-img shadow rounded-0 bg-body"}/>
                </div>
            </Col>
            <Col xs={12} sm={6} md={8}>
                <div className={"mb-3"}>
                    <strong>
                        Title
                    </strong>
                    <br/>

                    <h4>
                        {props.book && props.book.title}
                    </h4>
                    <br/>
                </div>

            </Col>
        </Row>
    </div>)
}



function MyVerticallyCenteredModal(props: any) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.book.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SingleBookFullDetails book={props.book}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export function CardBook(props: any){
    const context = useGlobalStore()
    // @ts-ignore
    let book = context.elements[props.id]


    const no_cover_book_url = new URL('bg-no-book-cropped.png' ,Config.base_url)

    let cover_book_url = no_cover_book_url

    const coverRatioDEfault = 1.3
    let paddingTop: number =  coverRatioDEfault * 100
    let aspectRatio: number = 1 / coverRatioDEfault

    if (book.cover !== undefined){
        cover_book_url = new URL(book.cover, Config.covers_dir_url)
        paddingTop = Number(book.cover_ratio)*100
        aspectRatio = 1 / Number(book.cover_ratio)
    }

    const book_url = "/book/"+props.id+"#title"

    const contextGridSize = useContext(GridSizeContext);
    const titleSize = contextGridSize.gridSize >= 5? "h6" : "h5"

    /*
    src={!book.cover ? no_cover_url : cover_book_url}
     */

    const [modalShow, setModalShow] = React.useState(false);

    console.log('Book cover: ')
    console.log(book.cover)

    // @ts-ignore
    return (
        <Col>
            <Card className="book-card mb-5 border-0 ">
                <div
                    className={"book-card-img shadow rounded-0 bg-body"}
                    style={{
                        backgroundImage: `url(${no_cover_book_url.pathname})`,
                        backgroundSize: "cover",
                        width: "100%",
                        aspectRatio: `${aspectRatio}`,
                    }}>
                    {book.cover &&
                        <a className={"book-card-img-a"} onClick={() => setModalShow(true)}>
                            <LazyLoadImage
                                className={"card-img-top rounded-0 text-center"}
                                src={cover_book_url}
                                effect="blur"
                                threshold={5000}/>
                        </a>}
                </div>
                <Card.Body>
                    <div className={titleSize}>
                        {book.title}</div>

                    <div className={"flex-column"}>
                        <div className={"small"}>
                            <SharepointItemLink path={book.path} typeItem={ItemTypeMSOneDrive.File} showText={true}/></div>
                        <div className={"small"}>
                            <Link to={book_url}>
                                <FaExternalLinkAlt/>&nbsp;NewTab</Link></div>
                        <div className={"small"}>
                            <a className={"link-primary"} onClick={() => setModalShow(true)}>
                                <FaExpandArrowsAlt/>&nbsp;Details</a></div>
                    </div>

                    <div className={"d-none"}>
                        books.cover_ratio: {book.cover_ratio}
                        <br/>
                    </div>

                </Card.Body>
            </Card>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                book={book}
            />
        </Col>
    );
}


export function BookListItem(props: any){
    const context = useGlobalStore();
    // @ts-ignore
    let element = context.elements[props.id]
    return(
        <div className={'book-list-item mb-1'}>
            <div className={'text-book-list-item'}>
                <strong>🔹 {element.title}</strong>
                <small className={"text-muted px-1"} style={{display: "none"}}>ID: {props.id}</small>

                <small className={"px-1"}><SharepointItemLink path={element.path} typeItem={ItemTypeMSOneDrive.File} showText={false}/></small>

            </div>
        </div>
    );
}


const showIconsText = false;

const showStatusText = true;



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


    // @ts-ignore
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

                    {!collapsed &&
                        <a className="link-primary"
                           onClick={() => setGridView(existingValue => !existingValue)}>
                            {gridView ? <MdGridOn/> : <MdGridOff/>}
                            {showIconsText && <>
                                &nbsp;
                                {gridView ? "Off Grid View": "On Grid View "}</>}</a>}

                    <SharepointItemLink path={element.path} typeItem={ItemTypeMSOneDrive.Dir} showText={false}/>

                    <TreeLink tree_id={element.id}/>



                </div>
            </div>

            <br className={"d-none"}/>

            <div className={"elementDescription small px-4  d-none gap-3"}>

                {showStatusText && <>
                    <div className="text-muted d-none">
                        ID: {props.id}</div>

                    <div>
                        🔹 collapsed: {collapsed ?  "🔐 Closed" : "📖 Open"}</div>
                    <div>
                        🔹 childCollapsed: {childCollapsed ?  "🔐 Closed" : "📖 Open"}</div>
                    <div>
                        🔹 gridView: {gridView? "🟢 True" : "🔴 False"}</div>
                </>}
            </div>



            <ul className={"mb-0 pt-2 tree-dirs-ul"} key={props.id+"_dirs"} style={{ display: collapsed ? "none" : "block" }}>
                {dirs.map((dir_id: any) => {
                    const childs_of_child = props.childs[dir_id];
                    if (childs_of_child != null) {
                        return (
                            <li key={dir_id+"_dirs_li"}>
                                <DirListItem
                                    id={dir_id} childs={childs_of_child}
                                    parentCollapsed={makeChildCollapsed}
                                    parentGlobalCollapsed={makeChildGlobalCollapsed}
                                    level={level}
                                    sumHeight={sumHeight}/></li>)}})}</ul>


            {gridView
                ? <ul key={props.id+"_files"} className={"tree-files-ul"} style={{ display: collapsed ? "none" : "block" }}>
                    {files.map((file_id: any) => {
                        return(
                            <li key={file_id+"_files_li"}>
                                <BookListItem id={file_id}/></li>)})}</ul>
                : <div className={"px-5"}>
                    <h6>Grid Book List</h6>
                    <GridBooks books_ids={files}/>
                </div>
            }


        </div>
    )
}


export function GridBooks(props: any) {
    const contextGridSize = useContext(GridSizeContext);

    return (<>
        <Row xs={contextGridSize.gridSize}
             sm={contextGridSize.gridSize}
             md={contextGridSize.gridSize}
             lg={contextGridSize.gridSize}
             xl={contextGridSize.gridSize}
             className="books-grid grid-test"
             data-masonry='{"percentPosition": true }'>
            {props.books_ids.map(
                (book_id: any) => <CardBook id={book_id} key={book_id}/>)}
        </Row>
    </>)
}




