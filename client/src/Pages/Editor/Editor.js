import React, {Component} from "react";
import axios from "axios";
import "./Editor.css";
import {Container, Row, Col} from "../../Components/Grid";
import CardBody from "../../Components/CardBody";
import Button from "../../Components/Button";


class Editor extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {}

        // BIND THIS FOR HANDLECLICK
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get("/api/characters")
        .then(res => {
            console.log(res);
        })
    }

    render() {
        return (

            <div>
                <Row id="editorRow">
                    <Col size="3" id="tabsLeft">
                        {/* <div className="nav"> */}
                           <button className="btn btn-dark rounded-0 tabBtn">
                            Characters
                            </button>
                            <button className="btn btn-light rounded-0 tabBtn">
                            Plot
                            </button>
                        {/* </div> */}
                        <h3> tabs go here </h3>
                    </Col>

                    <Col size="6">
                        <h3> editor goes here </h3>
                    </Col>

                    <Col size="3" id="tabsRight">
                        <button className="btn btn-dark rounded-0 tabBtn">
                            Worldbuild
                        </button>
                        <button className="btn btn-light rounded-0 tabBtn">
                            Notes
                        </button>
                        <h3> more tabs go here </h3>
                    </Col>

                </Row>
            </div>
        )
    }
}

export default Editor;