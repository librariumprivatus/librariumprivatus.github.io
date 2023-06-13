import * as React from "react";
import {GridSizeContext, useGlobalStore} from "../Elements/ProviderContext";

import {useContext} from "react";
import {GridBooks} from "../Elements/Book";

function BooksRandom() {
    const context = useGlobalStore();
    const contextGridSize = useContext(GridSizeContext);

    const randomBooks: any[] = []

    const keys = Object.values(context.books);

    const randomInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    let randomBooks_ids: never[] = []

    const MAX_BOOKS = 10
    for (let i = 0; i < MAX_BOOKS; i++) {
        const randomNumber = randomInt(0, context.books.length)
        const randomBook_id = context.books[randomNumber]
        randomBooks_ids.push(randomBook_id)
    }
    return (<>
        <h1>RandomBooks</h1>
        <GridBooks books_ids={randomBooks_ids}/>
    </>)
}

export default BooksRandom
