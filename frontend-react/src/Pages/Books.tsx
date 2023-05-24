import * as React from "react";
import {useGlobalStore} from "../Elements/GlobalStore";
import {BookByID, CardBook, DirListItem} from "../Elements/Book";
import Row from "react-bootstrap/Row";
import {WelcomeLinkSharepoint} from "../Elements/Sharepoint";
import {AiOutlineMinusSquare, BsPlusSquare} from "react-icons/all";
import {useState} from "react";

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

    const [gridSize, setGridSize] = useState(4)

    const minGridSize = 1
    const maxGridSize = 6

    function plus() {
        setGridSize(gridSize => Math.min(gridSize + 1, maxGridSize))
    }

    function minus() {
        setGridSize(gridSize => Math.max(gridSize - 1, minGridSize))
    }

    return(<>
        <div>
            <div className="btn-group px-2" role="group" aria-label="Basic example">
                <button onClick={plus} type="button" className="btn btn-light"><BsPlusSquare/> Plus</button>
                <button onClick={minus} type="button" className="btn btn-light"><AiOutlineMinusSquare/> Minus</button>
            </div>
            gridSize: {gridSize}
        </div>
        <br/>

        <Row xs={gridSize} sm={gridSize} md={gridSize} lg={gridSize} xl={gridSize}
             className="books-grid grid-test"
             data-masonry='{"percentPosition": true }'
        >
            {props.books_ids.map(
                (book_id: any) => <BookByID id={book_id} key={book_id}/>)
            }
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
