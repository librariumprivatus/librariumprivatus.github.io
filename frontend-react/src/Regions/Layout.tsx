import * as React from "react";

import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";

import Header from "./Header";
import Main from "./Main";


function LayoutContent(){
    return (<>
        <Header></Header>
        <hr />

        <Main></Main>
        <hr />

        <footer className="py-3 my-4">
            <p className="text-center text-muted">© 2022 Company, Inc</p>
            <p className="text-center text-muted pt-5 pb-5">1</p>
            <p className="text-center text-muted pt-5 pb-5">2</p>
            <p className="text-center text-muted pt-5 pb-5">3</p>
            <p className="text-center text-muted pt-5 pb-5">4</p>
        </footer>
    </>)
}


function Layout() {
    return (<div>
        <Container fluid="sm">
            <Row>
                <Col>
                    <LayoutContent></LayoutContent>
                </Col>
            </Row>
        </Container>
    </div>)
}

export default Layout
