import * as React from "react";
import {useGlobalStore} from "../Elements/GlobalStore";
import {DirListItem} from "../Elements/Book";

function ContentTreeBooks() {
    const context = useGlobalStore();

    //console.log("ContentTreeBooks: ")
    //console.log("context tree: ")
    //console.log(context.tree)

    const id = Object.keys(context.tree)[0]
    //console.log("Tree ID: ", id)
    // @ts-ignore
    const childs = context.tree[id]

    return (<>
        <h3>Tree Books Content</h3>
        <DirListItem id={id} childs={childs}/>
    </>)
}

function Tree() {
    return (<>
        <h1>Tree page</h1>
        <ContentTreeBooks/>
    </>)
}

export default Tree
