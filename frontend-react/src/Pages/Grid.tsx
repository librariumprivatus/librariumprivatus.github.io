import TitleAndLogoBlock from "../Regions/HeaderTitle";
import * as React from "react";

import {useEffect, useState} from 'react';

import Row from "react-bootstrap/Row";


const dataUrlRoot = "https://librariumprivatus.github.io/data-librariumprivatus/";
const mainJson = "main.json";

import "../Elements/Book.css"
import {CardBook} from "../Elements/Book";
import {AiOutlineMinusSquare, BsPlusSquare} from "react-icons/all";


function SizerGrid(){
    return(<div>
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-light"><BsPlusSquare/> Plus</button>
            <button type="button" className="btn btn-light"><AiOutlineMinusSquare/> Minus</button>
        </div>

    </div>)
}

export function ControlPanel(){
    return(<>
        <h4>Control Panel</h4>
        <SizerGrid/>
    </>)
}

function Books(props: any){
    return (<>
        <h4>Books count: {props.books?.length}</h4>
        <Row xs={2} sm={3} md={3} lg={3} xl={4} className="books-grid grid-test">
            {props.books?.map((book: any) =>
                <CardBook book={book} store={props.store}/>)};
        </Row>
    </>);
}


function Collection(props: any){
    return (<>
        <h2>Collection</h2>
        <Books books={props.collection.books} store={props.collection.store}/>
    </>)
}



function GridContent(){
    const [collection, setCollection] = useState({
        "collection": {},
    })

    const fetchData = () => {
        fetch(dataUrlRoot+mainJson)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCollection(data)
            })

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (<>
        <Collection collection={collection}/>
    </>)
}

function Grid(){
    return (<>
        <h1>Grid page</h1>
        <GridContent/>
    </>)
}

export default Grid;
