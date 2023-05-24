import * as React from "react";
import {useParams} from "react-router-dom";
import {useGlobalStore} from "../Elements/GlobalStore";


function Shelf() {
    let { id_short} = useParams();

    const context = useGlobalStore();

    // @ts-ignore
    const hasKey = id_short in context.scroll;

    let title = 'TTILE';
    if(hasKey){
        // @ts-ignore
        title = context.elements[id_short].title;
    }

    return (

        <>
            <h4>id_long_shelf: {id_short}</h4>
            {hasKey &&
                <h4> - Name: {title}</h4>
            }

            <br/>


        </>
    );
}

export default Shelf
