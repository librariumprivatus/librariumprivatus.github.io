import * as React from "react";
import {GridSizeGlobalContext, useGlobalStore} from "../Elements/GlobalStore";
import Row from "react-bootstrap/Row";

import {useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import * as Config from "../Config/Config";

import "./OneBook.css";
import {useContext} from "react";
import {BookByID} from "../Elements/Book";

function BooksRandom() {
    const context = useGlobalStore();
    const contextGridSize = useContext(GridSizeGlobalContext);

    const randomBooks: any[] = []

    const keys = Object.values(context.books);

    const randomInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    let rands: never[] = []

    const MAX_BOOKS = 10
    for (let i = 0; i < MAX_BOOKS; i++) {
        const r = randomInt(0, context.books.length)
        const r_book_id = context.books[r]
        rands.push(r_book_id)
    }
    return (<>
        <h1>RandomBooks</h1>

        <Row xs={contextGridSize.gridSize}
             sm={contextGridSize.gridSize}
             md={contextGridSize.gridSize}
             lg={contextGridSize.gridSize}
             xl={contextGridSize.gridSize}
             className="books-grid grid-test"
             data-masonry='{"percentPosition": true }'>
            {rands.map(
                (book_id: any) => <BookByID id={book_id} key={book_id}/>)}
        </Row>

    </>);
}

export default BooksRandom
