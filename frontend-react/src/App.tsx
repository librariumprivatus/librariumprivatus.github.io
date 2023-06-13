import * as React from "react";
import { Routes, Route, Link,} from "react-router-dom";

import Home from "./Pages/Home";
import AboutPage from "./Pages/AboutPage";
import NoMatch from "./Pages/NoMatch";
import Layout from "./Regions/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';
import Sandbox from "./Pages/Sandbox";
import Shelf from "./Pages/Shelf";
import BooksAll from "./Pages/BooksAll";
import BooksByMonths from "./Pages/BooksByMonths";
// @ts-ignore
import { Helmet } from "react-helmet"
import {TreeParamPage} from "./Pages/TreePage";
import Preferences from "./Pages/Preferences";
import OneBook from "./Pages/OneBook";
import BooksRandom from "./Pages/BooksRandom";
import SharePointAuthPage from "./Pages/SharepointAuth";
import TreePage from "./Pages/TreePage";



export const menuList = [
    <Link to="/">Home</Link>,
    <Link to="/tree">Tree</Link>,
    <Link to="/books">Books</Link>,
    <Link to="/months">Months</Link>,
    <Link to="/about">About</Link>,
    <Link to="/sandbox">Sandbox</Link>,
]

export const menuList2 = [
    {path: '/', title: 'Home'},
    {path: '/tree', title: 'Tree'},
    {path: '/books', title: 'Books All'},
    {path: '/months', title: 'Months Books Grid'},
    {path: '/random', title: 'Random Books'},
    {path: '/sandbox', title: 'Sandbox'},
    {path: '/about', title: 'About'},
    {path: '/preferences', title: 'Preferences'},
    {path: '/sharepoint-auth', title: 'Sharepoint Auth'},

]


/*
<Route path="treeparam/:id_short?" element={<TreeParam />} />
 */

export default function App() {
    return (<>
        <Helmet>
            <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
                    integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
                    crossOrigin="anonymous" async/>
        </Helmet>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home/>} />
                <Route path="tree/:tree_id?" element={<TreeParamPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="sandbox" element={<Sandbox />} />
                <Route path="shelf/:id_short?" element={<Shelf />} />
                <Route path="books" element={<BooksAll />} />
                <Route path="months" element={<BooksByMonths />} />
                <Route path="preferences" element={<Preferences />} />
                <Route path="book/:book_id?" element={<OneBook />} />
                <Route path="random" element={<BooksRandom />} />
                <Route path="sharepoint-auth" element={<SharePointAuthPage />} />

                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
        </>);
}











