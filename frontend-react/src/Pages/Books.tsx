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


const gridSizeOptions = {
    minSize: 1,
    maxSize: 12,
}



export function GridBooks(props: any){
    const contextGridSize = useContext(GridSizeGlobalContext);

    return(<>
        <Row xs={contextGridSize.gridSize}
             sm={contextGridSize.gridSize}
             md={contextGridSize.gridSize}
             lg={contextGridSize.gridSize}
             xl={contextGridSize.gridSize}
             className="books-grid grid-test"
             data-masonry='{"percentPosition": true }'>
            {props.books_ids.map(
                (book_id: any) => <BookByID id={book_id} key={book_id}/>)}
        </Row>
    </>)
}

// //

function ContentBooksGrid() {
    const context = useGlobalStore();

    return (<>
        <h3>Content Books Grid </h3>
        <h5>Len books: {context.books.length}</h5>
        <GridBooks books_ids={context.books}/>
    </>);
}






function Books() {
    return (<>
        <h1>Books Grid</h1>
        <br/>

        <ContentBooksGrid></ContentBooksGrid>

    </>);
}

export default Books
