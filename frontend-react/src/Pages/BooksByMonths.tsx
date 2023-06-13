import * as React from "react";
import {useGlobalStore} from "../Elements/ProviderContext";
import {GridBooks} from "../Elements/Book";

function getHumanReadable_YYMM(stamp: any){
    const date = new Date(Number(stamp + '000'));
    const month = date.toLocaleString('default', { month: 'long' });
    const formattedStr = date.getFullYear() + ' ' + month;
    //console.log(formattedStr);
    return formattedStr;
}

function BooksByMonths() {
    const context = useGlobalStore();

    return (<>
        <h1>Books Months Grid</h1>
        {context.months.map(
            (month) => (<>
                <h4>{getHumanReadable_YYMM(month)}</h4>
                <small>{month}</small>
                <br/>
                <GridBooks books_ids={context.booksByMonths[month]}/>
            </>)
        )}
    </>)
}


export default BooksByMonths
