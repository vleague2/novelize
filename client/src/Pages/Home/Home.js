import React, { Component } from "react";
import Jumbotron from "../../Components/Jumbotron"
import Button from "../../Components/Button"
import "./Home.css";
import {Container, Row, Col} from "../../Components/Grid";
import CardBody from "../../Components/CardBody"
import Footer from "../../Components/Footer"

const Home = () => (
    <div>
        <Jumbotron> 
            <h1 id="site-h1">Novelize</h1> 
            <p class="jumbotron-subtext">An integrated drafting environment for novelists.</p>
            <Button>Get Started</Button>
        </Jumbotron>

        <Container>
            <h3>Features</h3>   
            <p className="descr-text">Novelize is a free, easy-to-use application that simplifies the process of writing a novel. See all of your character profiles, plot plans, research notes, and worldbuilding in one space so that you can quickly refer to them while drafting. 
            </p>
            <Row>
              
                    <Col size="4" id="left-col">
                        <CardBody id="env" href="/">Writing Environment</CardBody>
                        <CardBody id="char" href="/">Character Profiles</CardBody>
                        <CardBody id="world" href="/">World Building</CardBody>
                        <CardBody id="plot" href="/">Plot Outlining</CardBody>
                        <CardBody id="note" href="/">Notes</CardBody>
                    </Col>
                    <Col size="8" id="right-col">
                        <CardBody id="info-container">Lots of stuff goes here</CardBody>
                    </Col>
              
            </Row>

            <Row>
                <Col size="12" id="button-row">
                    <Button>Get Started</Button>
                </Col>
            </Row>
        </Container>

        <h1>
            <p role="img" aria-label="Face With Rolling Eyes Emoji" id="emojis">
            🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄
            </p>
        </h1>

        <Footer/>

    </div>
  );
  
export default Home;