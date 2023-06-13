import * as React from "react";
import {useGlobalStore} from "../Elements/ProviderContext";
import {GridBooks} from "../Elements/Book";


function BooksAll() {
    const context = useGlobalStore()

    return (<>
        <h1>Books All</h1>
        <br/>
        <h3>Content Books Grid </h3>
        <h5>Len books: {context.books.length}</h5>
        <GridBooks books_ids={context.books}/>
    </>)
}

export default BooksAll
