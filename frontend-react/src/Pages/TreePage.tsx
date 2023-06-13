import * as React from "react";
import {useGlobalStore} from "../Elements/ProviderContext";
import {DirListItem} from "../Elements/Book";
import {Link, useParams} from "react-router-dom";
import {BsTreeFill} from "react-icons/bs";


export function TreeLink(props: any){
    return(
        <Link to={`/tree/${props.tree_id}`} className={"link-primary px-1"}>
            <BsTreeFill/></Link>
    )
}


export function ShowTree(props: any) {
    if(props.tree === undefined)
        return (<h5>NoTree</h5>)

    const topNodeID = Object.keys(props.tree)[0]
    return (<>
        <DirListItem id={topNodeID} childs={props.tree[topNodeID]}/>
    </>)
}

// @ts-ignore
function UpNodes(node: any){
    const context = useGlobalStore()
    const upNodes = [node]

    // @ts-ignore
    const parent = context.elements[node].parent
    if(parent === '.')
        return upNodes

    return upNodes.concat(UpNodes(parent))
}

// @ts-ignore
function getSubTree(tree: any, children: Array<string>){

    const node = children.pop()
    // @ts-ignore
    const subTree = tree[node]

    if(children.length)
        return getSubTree(subTree, children)

    // @ts-ignore
    return {[node]: subTree}
}

function getTopTreeNode(){
    const context = useGlobalStore()
    return Object.keys(context.tree)[0]
}

export function TreeParamPage(props: any) {
    const { tree_id } = useParams()
    console.log('⛵️ tree_id: ', tree_id)

    const context = useGlobalStore();
    if(tree_id === undefined)
        return <ShowTree tree={context.tree}/>

    const upNodes = UpNodes(String(tree_id))
    return <ShowTree tree={getSubTree(context.tree, upNodes)}/>
}



function TreePage() {
    return (<>
        <h1>Tree page</h1>
        <TreeParamPage/>
    </>)
}

export default TreePage
