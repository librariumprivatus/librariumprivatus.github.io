import * as React from "react";

import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";


function LayoutContent(){
    return (<>
        <Header/>
        <hr />

        <Main/>
        <Footer/>

    </>)
}


function Layout() {
    return (<div>
        <Container fluid="sm">
            <Row>
                <Col>
                    <LayoutContent/>
                </Col>
            </Row>
        </Container>
    </div>)
}

export default Layout
