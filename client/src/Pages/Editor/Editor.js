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
            characters: [],
            leftTab: "char_tab"
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get("/api/characters")
        .then(res => {
            let data = res.data;

            this.setState({characters: data});

            console.log(this.state.characters);

        });
    }

    handleClick(e) {
        let tab = e.target.id;

        switch (tab) {
            case "char_tab": 
                document.getElementById("char_tab").style.backgroundColor = "#343a40";
                document.getElementById("char_tab").style.color = "#f8f9fa";
                document.getElementById("plot_tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("plot_tab").style.color = "#343a40";
                break;
            case "plot_tab":
                document.getElementById("char_tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("char_tab").style.color = "#343a40";
                document.getElementById("plot_tab").style.backgroundColor = "#343a40";
                document.getElementById("plot_tab").style.color = "#f8f9fa";
                break;
            default:
                console.log("RIP Me");
        }
    }

    displayCharacters() {
        axios.get("/api/characters")
        .then(res => {
            let data = res.data;

            this.setState({characters: data});

            console.log(this.state.characters);
        })
    }


    render() {
        return (

            <div>
                <Row id="editorRow">
                    <Col size="3" id="tabsLeft">
                        <button className="btn rounded-0 tabBtn" id="char_tab" onClick={this.handleClick}>
                            Characters
                        </button>
                        <button className="btn rounded-0 tabBtn" id="plot_tab" onClick={this.handleClick}>
                            Plot
                        </button>
            
                        <div>
                            {this.state.characters.map(character => {
                                console.log("crying");
                                return <CharacterCard id={character.id} title={character.name} preview={character.preview_text} key={character.id} image={character.character_image} profile={character.character_text}/>
                            })}
                        </div>
                        
                        
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