import React, { Component } from "react";
import Jumbotron from "../../Components/Jumbotron"
import Button from "../../Components/Button"
import "./Home.css";
import {Container, Row, Col} from "../../Components/Grid";
import CardBody from "../../Components/CardBody"
import Footer from "../../Components/Footer"
import FeaturesDisplay from "../../Components/FeaturesDisplay";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: "env",
            title: "An Integrated Writing Environment",
            content: "some content here"
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.chooseDisplay(this.state.tab);
    }

    handleClick(e) {
        this.setState({tab: e.target.id});
        console.log(this.state.tab);
        this.chooseDisplay(e.target.id);
    }

    chooseDisplay(tab) {
        switch (tab) {
            case "env":
                console.log("ENV!!!");
                this.setState(
                    {title: "An Integrated Writing Environment",
                    content: "some things about the writing environment"}
                );
                break;
            case "char":
                console.log("CHAR!!!");
                this.setState(
                    {title: "Separate Profiles for Each Character",
                    content: "some things about the character profiles"}
                );
                break;
            case "world":
                console.log("WORLD!!!");
                this.setState(
                    {title: "Build the Components of Your World",
                    content: "some things about the worldbuilding process"}
                );
                break;
            case "plot":
                console.log("PLOT!!!!");
                this.setState(
                    {title: "Chart the Plot on a Timeline",
                    content: "some things about the plot timeline view"}
                );
                break;
            case "note":
                console.log("NOTE!!!!");
                this.setState(
                    {title: "Store Research and Notes",
                    content: "some things about the note system"}
                );
                break;
            default:
                console.log("broken");
                break;
        }
    }

    render() {
        return (
            <div>
                <Jumbotron> 
                    <h1 id="site-h1">Novelize</h1> 
                    <p className="jumbotron-subtext">An integrated drafting environment for novelists.</p>
                    <Button>Get Started</Button>
                </Jumbotron>

                <Container>
                    <h3>Features</h3>   
                    <p className="descr-text">Novelize is a free, easy-to-use application that simplifies the process of writing a novel. See all of your character profiles, plot plans, research notes, and worldbuilding in one space so that you can quickly refer to them while drafting. 
                    </p>
                    <Row>
                    
                        <Col size="4" id="left-col">
                            <CardBody id="env" onClick={this.handleClick}>Writing Environment <i class="fas fa-angle-right"></i></CardBody>
                            <CardBody id="char" onClick={this.handleClick}>Character Profiles <i class="fas fa-angle-right"></i></CardBody>
                            <CardBody id="world" onClick={this.handleClick}>World Building <i class="fas fa-angle-right"></i></CardBody>
                            <CardBody id="plot" onClick={this.handleClick}>Plot Outlining <i class="fas fa-angle-right"></i></CardBody>
                            <CardBody id="note" onClick={this.handleClick}>Notes <i class="fas fa-angle-right"></i></CardBody>
                        </Col> 
                        <Col size="8" id="right-col">
                            <FeaturesDisplay id="info-container" title={this.state.title} content={this.state.content}/>
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
        )
    }
};
  
export default Home;