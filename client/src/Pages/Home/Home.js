// REQUIRED IMPORTS
import React, { Component } from "react";
import Jumbotron from "../../Components/Jumbotron"
import Button from "../../Components/Button"
import "./Home.css";
import {Container, Row, Col} from "../../Components/Grid";
import CardBody from "../../Components/CardBody"
import FeaturesDisplay from "../../Components/FeaturesDisplay";


// CREATE HOME COMPONENT
class Home extends Component {

    // INITIALIZE WITH A CONSTRUCTOR THAT ACCEPTS PROPS
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            tab: "env",
            title: "An Integrated Writing Environment",
            content: "some content here"
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);
    }

    // WHEN THE APP STARTS, RUN THE DISPLAY FUNCTION AND PASS IN CURRENT TAB
    componentDidMount() {
        this.chooseDisplay(this.state.tab);
    }

    // FUNCTION TO HANDLE A CLICK, AND PASS IN THE EVENT
    handleClick(e) {

        // RESET ALL TAB COLORS TO WHITE
        document.getElementById("env").style.backgroundColor = "white";
        document.getElementById("char").style.backgroundColor = "white";
        document.getElementById("world").style.backgroundColor = "white";
        document.getElementById("plot").style.backgroundColor = "white";
        document.getElementById("note").style.backgroundColor = "white";

        // UPDATE THE STATE WITH THE ID OF THE SELECTED TAB
        this.setState({tab: e.target.id});
        console.log(this.state.tab);

        // CALL THE DISPLAY FUNCTION WITH THE ID OF THE SELECTED TAB
        this.chooseDisplay(e.target.id);
    }

    // FUNCTION TO CHOOSE WHICH TAB TO DISPLAY
    chooseDisplay(tab) {
        
        // SWITCH FOR DECISION LOGIC BASED ON THE TAB SELECTED
        switch (tab) {

            // IF THEY SELECT THE ENV TAB
            case "env":
                // UPDATE THE STATE WITH THE TITLE AND CONTENT RELATED TO ENV
                this.setState(
                    {title: "An Integrated Writing Environment",
                    content: "some things about the writing environment"}
                );
                
                // MAKE THE ENV TAB GRAY
                document.getElementById(tab).style.backgroundColor = "#dfdfdf";

                // EXIT SWITCH STATEMENT
                break;

            // IF THEY SELECT THE CHAR TAB
            case "char":
                // UPDATE THE STATE WITH THE TITLE AND CONTENT RELATED TO CHAR
                this.setState(
                    {title: "Separate Profiles for Each Character",
                    content: "some things about the character profiles"}
                );

                // MAKE THE CHAR TAB GRAY
                document.getElementById(tab).style.backgroundColor = "#dfdfdf";

                // EXIT THE SWITCH STATEMENT
                break;

            // IF THEY SELECT THE WORLD TAB
            case "world":
                // UPDATE THE STATE WITH THE TITLE AND CONTENT RELATED TO WORLD
                this.setState(
                    {title: "Build the Components of Your World",
                    content: "some things about the worldbuilding process"}
                );

                // MAKE THE WORLD TAB GRAY
                document.getElementById(tab).style.backgroundColor = "#dfdfdf";

                // EXIT THE SWITCH STATEMENT
                break;
            
            // IF THEY SELECT THE PLOT TAB
            case "plot":
                // UPDATE THE STATE WITH THE TITLE AND CONTENT RELATED TO PLOT
                this.setState(
                    {title: "Chart the Plot on a Timeline",
                    content: "some things about the plot timeline view"}
                );

                // MAKE THE PLOT TAB GRAY
                document.getElementById(tab).style.backgroundColor = "#dfdfdf";

                // EXIT THE SWITCH STATEMENT
                break;

            // IF THEY SELECT THE NOTE TAB
            case "note":
                //UPDATE THE STATE WITH THE TITLE AND CONTENT RELATED TO NOTE
                this.setState(
                    {title: "Store Research and Notes",
                    content: "some things about the note system"}
                );

                // MAKE THE NOTE TAB GRAY
                document.getElementById(tab).style.backgroundColor = "#dfdfdf";

                // EXIT THE SWITCH STATEMENT
                break;

            // IF NONE OF THE ABOVE APPLY
            default:
                // THEN IT'S DEFINITELY BROKEN
                console.log("broken");
                break;
        }
    }

    // RENDER FUNCTION FOR WHAT WILL DISPLAY TO THE CLIENT
    render() {

        // RETURN THE FOLLOWING
        return (

            // DIV TO HOLD IT ALL
            <div>

                {/* CALL THE JUMBOTRON COMPONENT */}
                <Jumbotron> 
                    <h1 id="site-h1">Novelize</h1> 
                    <p className="jumbotron-subtext">An integrated drafting environment for novelists.</p>
                    <Button>Get Started</Button>
                </Jumbotron>

                {/* CALL THE CONTAINER COMPONENT TO HOLD SITE TITLE AND TAGLINE*/}
                <Container>
                    <h3>Features</h3>   
                    <p className="descr-text">Novelize is a free, easy-to-use application that simplifies the process of writing a novel. See all of your character profiles, plot plans, research notes, and worldbuilding in one space so that you can quickly refer to them while drafting. 
                    </p>

                    {/* CALL THE ROW COMPONENT */}
                    <Row>

                        {/* FEATURES TABS: CALL THE COLUMN COMPONENT AND GIVE IT A SIZE OF 4 */}
                        <Col size="4" id="left-col">

                            {/* ADD IN 5 CARDBODY COMPONENTS, WITH UNIQUE ID'S AND FEED IT THE HANDLECLICK FUNCTION SO THAT THE FUNCTIONS ABOVE RUN WHEN THE TAB IS CLICKED */}
                            <CardBody id="env" onClick={this.handleClick}>Writing Environment <i className="fas fa-angle-right"></i></CardBody>
                            <CardBody id="char" onClick={this.handleClick}>Character Profiles <i className="fas fa-angle-right"></i></CardBody>
                            <CardBody id="world" onClick={this.handleClick}>World Building <i className="fas fa-angle-right"></i></CardBody>
                            <CardBody id="plot" onClick={this.handleClick}>Plot Outlining <i className="fas fa-angle-right"></i></CardBody>
                            <CardBody id="note" onClick={this.handleClick}>Notes <i className="fas fa-angle-right"></i></CardBody>
                        </Col> 

                        {/* FEATURES INFO: CALL ANOTHER COLUMN SIZE 8 */}
                        <Col size="8" id="right-col">

                            {/* CALL THE FEATURESDISPLAY COMPONENT THAT TAKES THE STATE INFO FOR DYNAMIC UPDATING */}
                            <FeaturesDisplay id="info-container" title={this.state.title} content={this.state.content}/>
                        </Col>
                    </Row>

                    {/* ANOTHER ROW COMPONENT FOR THE NEXT SET OF STUFF */}
                    <Row>
                        {/* COLUMN SIZE 12 TO HOLD A BUTTON */}
                        <Col size="12" id="button-row">

                            {/* CALL THE BUTTON COMPONENT AND GIVE IT TEXT */}
                            <Button>Get Started</Button>
                        </Col>
                    </Row>
                    {/* <h1>
                        <p role="img" aria-label="Face With Rolling Eyes Emoji" id="emojis">
                        🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄
                        </p>
                    </h1> */}
                </Container>
            </div>
        )
    }
};
  
// EXPORT FOR USE BY APP.JS
export default Home;