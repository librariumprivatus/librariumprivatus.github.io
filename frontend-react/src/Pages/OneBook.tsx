import * as React from "react";
import {GridSizeGlobalContext, useGlobalStore} from "../Elements/GlobalStore";
import {BookByID, CardBook, DirListItem} from "../Elements/Book";
import Row from "react-bootstrap/Row";
import {WelcomeLinkSharepoint} from "../Elements/Sharepoint";
import {
    AiOutlineMinusSquare,
    BsPlusSquare,
    HiMagnifyingGlassPlus,
    HiOutlineMagnifyingGlassPlus,
    SlMagnifierAdd, SlMagnifierRemove
} from "react-icons/all";
import {useContext, useState} from "react";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import * as Config from "../Config/Config";


import "./OneBook.css";


function OneBook() {
    let { book_id} = useParams();


    const context = useGlobalStore()
    // @ts-ignore
    let book = context.elements[book_id]

    let cover_book_url = "/bg-no-book-cropped.png"
    if(book){
        cover_book_url = new URL(book.cover, Config.covers_dir_url).href
    }

    return (<>
        <h1>OneBook</h1>

        <div className={"dev mb-3"}>
            <strong>URL Param</strong>
            <br/>
            {book_id}
            <br/>
        </div>


        <Row>
            <Col xs={12} sm={1}  md={1} lg={2} xl={2}/>
            <Col xs={12} sm={10} md={10} lg={8} xl={8}>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <div className={"text-center"}>
                            <img src={cover_book_url} alt={"COver"} className={"onebook-img shadow rounded-0 bg-body"}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={8}>
                        <div className={"mb-3"}>
                            <strong>Book ID</strong><br/>
                            {book_id}
                        </div>

                        <div className={"mb-3"}>
                            <strong>
                                Title
                            </strong>
                            <br/>

                            <h4>
                                {book && book.title}
                            </h4>
                            <br/>
                        </div>

                    </Col>
                </Row>
            </Col>
            <Col xs={12} sm={1} md={1} lg={2} xl={2}/>
        </Row>
    </>);
}

export default OneBook
