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

        // SET THE STATE WITH SOME INITIAL VALUE FOR THE FEATURES DISPLAY
        this.state = {
            tab: "env",
            title: "",
            content: ""
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);
    }

// ********** WHEN THE APP STARTS, RUN THE DISPLAY FUNCTION AND PASS IN CURRENT TAB
    componentDidMount() {
        this.chooseDisplay(this.state.tab);
    }

// ********** FUNCTION TO HANDLE A CLICK, AND PASS IN THE EVENT
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

// ************** FUNCTION TO CHOOSE WHICH TAB TO DISPLAY
    chooseDisplay(tab) {
        
        // SWITCH FOR DECISION LOGIC BASED ON THE TAB SELECTED
        switch (tab) {

            // IF THEY SELECT THE ENV TAB
            case "env":

                // UPDATE THE STATE WITH THE TITLE AND CONTENT RELATED TO ENV
                this.setState(
                    {title: "An Integrated Writing Environment",
                    content: "Novelize eliminates the age-old struggle of flipping through multiple documents to find that secondary character's life history while you're in the middle of writing a scene. Draft your story in an editing space that pulls in your character data, your worldbuilding data, your plot points, and any notes you've created. With everything you need in one spot, your drafting process will be seamless."}
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
                    content: "Novelize gives you the ability to set up a character profile with the character's name, a one-line bio for a quick overview, a document to hold the character's profile, and an image link to set the character's appearance. Each character's information is stored separately and edited separately so that it's easy to keep track of your data."}
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
                    content: "Worldbuilding in a regular document editor can be a tedious and unorganized process. Novelize gives you the ability to custom-set any worldbuilding elements you need to build out -- set a title of your choice, and then build out as much information about the element as you need. Each worldbuilding component is stored separately so you can easily organize the building blocks of your story."}
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
                    content: "Novelize's plot-builder visually displays your plot points in a timeline format so you can see the progression of the story clearly. Add a label for your plot point and a description of what happens, and the timeline will build itself. Edit and rearrange the events of your story so you always know what's coming next."}
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
                    content: "Rather than storing your notes and reminders in haphazard spots across your computer, keep everything together in the notes section of your story. Drop in research data, drafting reminders, to-dos, and anything else you need access to while writing. The data is pulled into your writing environment so that nothing is left behind."}
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

// ************* FUNCTION THAT RUNS WHEN THEY CLICK THE GET STARTED BUTTON
    login = () => {

        // REDIRECTS TO THE LOGIN PAGE
        window.location.href = "/login";
    }

// ************ RENDER FUNCTION FOR WHAT WILL DISPLAY TO THE CLIENT
    render() {

        // RETURN THE FOLLOWING
        return (

            // DIV TO HOLD IT ALL
            <div>

                {/* CALL THE JUMBOTRON COMPONENT */}
                <Jumbotron> 
                    <h1 id="site-h1">Novelize</h1> 
                    <p className="jumbotron-subtext">An integrated drafting environment for novelists.</p>
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

                            {/* ADD IN 5 CARDBODY COMPONENTS, WITH UNIQUE IDS AND FEED IT THE HANDLECLICK FUNCTION SO THAT THE FUNCTIONS ABOVE RUN WHEN THE TAB IS CLICKED */}
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
                            <Button id="get-started" className="mt-3" onClick={this.login}>Get Started</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};
  
// EXPORT FOR USE BY APP.JS
export default Home;