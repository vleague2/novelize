import React, { Component } from "react";
import Jumbotron from "../../Components/Jumbotron"
import Button from "../../Components/Button"
import "./Home.css";
import {Container, Row, Col} from "../../Components/Grid";
import CardBody from "../../Components/CardBody"

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
                <Col size="6">
                    <CardBody id="env">Writing Environment</CardBody>
                    <CardBody id="char">Character Profiles</CardBody>
                    <CardBody id="world">WorldBuilding</CardBody>
                    <CardBody id="plot">Plot Outlining</CardBody>
                    <CardBody id="note">Notes</CardBody>
                </Col>
                <Col size="6">
                    <h5> test </h5>
                </Col>
            </Row>


        </Container>

        <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄
            </span>
        </h1>
    </div>
  );
  
export default Home;