import React, {Component} from "react";
import axios from "axios";
import "./Editor.css";
import {Container, Row, Col} from "../../Components/Grid";
import CardBody from "../../Components/CardBody";
import Button from "../../Components/Button";
import CharacterCard from "../../Components/CharacterCard";


class Editor extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            characters: []
        }

        // BIND THIS FOR HANDLECLICK
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get("/api/characters")
        .then(res => {
            let data = res.data;

            this.setState({characters: data});

            console.log(this.state.characters);

            // setTimeout(this.displayCharacters(), 5000);
        })
    }

    displayCharacters() {

        this.state.characters.forEach(character => {
            let textChild = document.createElement("p");
            let textNode = document.createTextNode(character.name);
            textChild.appendChild(textNode);
            document.getElementById("charactershere").appendChild(textChild);
        })

        // let string="<CharacterCard id={this.characters[0].id} title={this.characters[0].name} preview={this.characters[0].preview_text}/>";
        // let div = document.createElement("div");
        // div.innerHTML(string);

        // document.getElementById("charactershere").appendChild(div);
    }


    render() {
        return (

            <div>
                <Row id="editorRow">
                    <Col size="3" id="tabsLeft">
                            <button className="btn btn-dark rounded-0 tabBtn">
                                Characters
                            </button>
                            <button className="btn btn-light rounded-0 tabBtn">
                                Plot
                            </button>
                        <span id="charactershere">
                            {this.state.characters.forEach(character => {
                                return <CharacterCard id={character.id} title={character.name} preview={character.preview_text}/>
                            })}
                        </span>
                        
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