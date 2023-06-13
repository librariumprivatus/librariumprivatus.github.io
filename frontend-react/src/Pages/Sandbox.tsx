import * as React from "react";
import {useGlobalStore} from "../Elements/ProviderContext";
import {TbLayoutBottombarCollapse, TbLayoutNavbarCollapse} from "react-icons/tb";
import {RiCollageFill, RiCollageLine} from "react-icons/ri";
import {
    BsArrowDownRightSquare,
    BsArrowUpLeftSquare,
    BsCardList,
    BsFillGrid3X2GapFill,
    BsFillGrid3X3GapFill, BsGrid3X3
} from "react-icons/bs";
import {AiOutlineUnorderedList} from "react-icons/ai";
import {CiViewList} from "react-icons/ci";
import {FaRegListAlt} from "react-icons/fa";
import {TfiLayoutGrid3Alt} from "react-icons/tfi";
import {MdGridOff, MdGridOn} from "react-icons/md";


function Button() {

    const context = useGlobalStore();

    return (
        <>
            <h3>4. Button</h3>
        </>
    );
}

function Block() {

    return (
        <>
            <h2>3. Block</h2>
            <Button></Button>
        </>
    );
}

function Box() {
    return (
        <>
            <h2>2. Box</h2>
            <Block></Block>
        </>
    );
}

function Sandbox() {

    return (
        <>
            <Box></Box>
            <div>
                <h3>Icons Good</h3>
                <small>
                    <a href={"/"}><TbLayoutBottombarCollapse/> or <TbLayoutNavbarCollapse/></a>
                </small>
                &nbsp;

                <small>
                    <a href={"/"}>
                        <RiCollageLine/> or <RiCollageFill/>,
                        <BsArrowUpLeftSquare/> or <BsArrowDownRightSquare/>,
                    </a>
                </small>
                &nbsp;

                <small>
                    <a href={"/"}><BsCardList/>, <AiOutlineUnorderedList/>,
                        <CiViewList/>, <FaRegListAlt/>
                        or
                        <BsFillGrid3X2GapFill/>, <BsFillGrid3X3GapFill/>,
                        <BsGrid3X3/>, <TfiLayoutGrid3Alt/>,
                        <MdGridOff/>, <MdGridOn/>
                    </a>
                </small>
                &nbsp;
            </div>
            <>
                <h2>Iphone Links</h2>
                <a href={"calc://"}>Calc</a>
                <br/>
                <a href={"books://"}>books</a>
                <br/>
                <a href={"onedrive://"}>onedrive</a>
                <br/>
                <a href={"OneDrive://"}>OneDrive</a>
                <br/>
                <a href={"com.microsoft.skydrive://"}>com.microsoft.skydrive</a>
                <br/>
                <a href={"com.microsoft.Office.OneDrive://"}>com.microsoft.Office.OneDrive</a>
                <br/>
                <a href={"onedrive.com://"}>onedrive.com</a>
                <br/>
                <a href={"sharepoint.com://"}>sharepoint.com</a>
                <br/>
                <a href={"com.apple.iBooks://"}>com.apple.iBooks</a>
                <br/>
                <a href={"com.apple.ibooks://"}>com.apple.ibooks</a>
                <br/>
                <a href={"applestore://"}>applestore://</a>
                <br/>
                <a href={"ibooks://"}>ibooks://</a>
                <br/>
                <a href={"calshow://"}>calshow://</a>
                <br/>
                <a href={"camera://"}>camera://</a>
                <br/>
                <a href={"messages://"}>messages://</a>
                <br/>
                <a href={"mobilenotes://"}>mobilenotes://</a>
                <br/>

                <a href={"com.microsoft.OneDrive-mac://"}>com.microsoft.OneDrive-mac://</a>
                <br/>
                <a href={"com.microsoft.OneDrive://"}>com.microsoft.OneDrive://</a>
                <br/>
                <a href={"com.microsoft.OneDrive-ios://"}>com.microsoft.OneDrive-ios://</a>
                <br/>
                <a href={"odopen://"}>odopen://</a>
                <br/>
            </>
        </>
    );
}

export default Sandbox
