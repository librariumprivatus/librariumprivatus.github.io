import * as React from "react";
// @ts-ignore
import { createGlobalStyle } from "styled-components";
// @ts-ignore
import styled from 'styled-components'
import "./HeaderTitle.css"

function getFont() {
    const fonts = [
        '101! Hieroglyphic Dieties.ttf',
        'ArgGotSc.ttf',
        'ArimaKoshi-ExtraLight.otf',
        'ArimaKoshi-Light.otf',
        'ArimaKoshi-Medium.otf',
        'ArimaKoshi-Regular.otf',
        'ArimaKoshi-Thin.otf',
        'AvQest.ttf',
        'Barbarian.ttf',
        'Black Forest.ttf',
        'BURGOYNE.ttf',
        'Celtic.ttf',
        'Cinzel-Bold.otf',
        'Cinzel-Bold.ttf',
        'Cinzel-Regular.otf',
        'Cinzel-Regular.ttf',
        'CinzelDecorative-Regular.otf',
        'CinzelDecorative-Regular.ttf',
        'FLORANA.ttf',
        'Forum-Regular.ttf',
        'geek.ttf',
        'Italiana-Regular.ttf',
        'Kingthings Petrock light.ttf',
        'Lombardic Narrow.ttf',
        'mevno1.ttf',
        'mevno2.ttf',
        'PictureA.ttf',
        'Praetoria D.otf',
        'Rise of Kingdom.ttf',
        'spqr.ttf',
        'TwoForJuanNF.otf',
        'TwoForJuanNF.ttf',
        'UncialAntiqua-Regular.ttf',
        'WeThePeople.ttf',
        'Wilson wells.otf',
        'Wilson wells.ttf'
    ];
    const font = fonts[Math.floor(Math.random() * fonts.length)]

    let font_name = font.split(".")[0];
    let font_type = font.split(".")[1];


    return font;
}

const font = getFont()

// const title_word = <>"LIBRARIUM"<wbr>" PRIVATUS"</wbr>
const title_word = <>{"LIBRARIUM "}<wbr/>{"PRIVATUS"}</>



const font_name = font.split('.')[0]
const font_type = font.split('.')[1]

const FontStyles = createGlobalStyle`
  @font-face {  
    font-family: ${font_name};
    src: url("/fonts/${font}") format('truetype');
}
`;


const H1Title = styled.h1`
  font-family: ${font_name}, sans-serif;
  font-weight: 700;
`;


const TitleContainer = styled.div`
`;


const TitleElement = styled.div`
`;

function TitleAndLogoBlock() {
    // @ts-ignore
    return (<>
        <FontStyles/>
        <TitleContainer className="titlecontainer">
            <TitleElement className="titleelement">
                <H1Title className="titleh">{title_word}</H1Title>
            </TitleElement>
            <p>
                Font-family: {font_name}
            </p>
        </TitleContainer>
    </>)
}


export function HeaderTitle(){
    return(<>
        <h2>{title_word}</h2>
        <br/>
        <TitleAndLogoBlock/>
    </>)
}

export default TitleAndLogoBlock
