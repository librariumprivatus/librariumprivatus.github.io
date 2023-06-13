import * as React from "react";
import {useGlobalStore} from "../Elements/ProviderContext";
import Row from "react-bootstrap/Row";

import {useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import * as Config from "../Config/Config";

import {SingleBookFullDetails} from "../Elements/Book";


function OneBook() {
    let { book_id} = useParams();

    const context = useGlobalStore()
    // @ts-ignore
    let book = context.elements[book_id]

    let cover_book_url = "/bg-no-book-cropped.png"
    if(book){
        cover_book_url = new URL(book.cover, Config.covers_dir_url).href}

    // @ts-ignore
    return (<div>
        <div className={"mb-3"} >
            <h2 id={"title"}>📚 {book && book.title}</h2></div>

        <div className={"dev mb-3"}>
            <strong>URL Param</strong>
            <br/>
            {book_id}
            <br/>
        </div>

        <Row>
            <Col xs={12} sm={1}  md={1} lg={2} xl={2}/>
            <Col xs={12} sm={10} md={10} lg={8} xl={8}>
                <SingleBookFullDetails book={book}/>
            </Col>
            <Col xs={12} sm={1} md={1} lg={2} xl={2}/>
        </Row>
    </div>);
}

export default OneBook
