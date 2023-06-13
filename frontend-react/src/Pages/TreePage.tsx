import * as React from "react";
import {useGlobalStore} from "../Elements/ProviderContext";
import {DirListItem} from "../Elements/Book";


export function ShowTree(props: any) {
    if(props.tree === undefined)
        return (<h5>NoTree</h5>)

    const topNodeID = Object.keys(props.tree)[0]
    return (<>
        <DirListItem id={topNodeID} childs={props.tree[topNodeID]}/>
    </>)
}


function TreePage() {
    const context = useGlobalStore();

    return (<>
        <h1>Tree page</h1>
        <ShowTree tree={context.tree}/>

    </>)
}

export default TreePage
