import React, {Component} from "react";
import axios from "axios";
import "./Editor.css";
import {Container, Row, Col} from "../../Components/Grid";
import CardBody from "../../Components/CardBody";
import Button from "../../Components/Button";
import CharacterCard from "../../Components/CharacterCard";
import { Editor } from '@tinymce/tinymce-react';


class EditorPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            characters: [],
            story: ""
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

        axios.get("/api/story")
        .then(res => {
            let story = res.data.story_text;

            this.setState({story: story})
        })

        // tinymce.init({
        //     selector: '#editortextarea',
        //     height: 500,
        //     menubar: false,
        //     plugins: [
        //       'advlist autolink lists link image charmap print preview anchor textcolor',
        //       'searchreplace visualblocks code fullscreen',
        //       'insertdatetime media table contextmenu paste code help wordcount'
        //     ],
        //     toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        //     content_css: [
        //       '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        //       '//www.tinymce.com/css/codepen.min.css']
        // });
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


    handleEditorChange = (e) => {
        // console.log('Content was updated:', e.target.getContent());
        axios.post('/api/story', {
            story: e.target.getContent()
        }).then(res => {
            console.log(res.data.story_text);
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

                    <Col size="6" id="editorCol">
                        <Editor
                            apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' cloudChannel='dev'
                            initialValue={`<p>${this.state.story}</p>`}
                            id="textEditor"
                            
                            init={{
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor textcolor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table contextmenu paste code help wordcount'
                            ],
                            toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            menubar: false,
                            content_css: [
                                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                '//www.tinymce.com/css/codepen.min.css'],
                            }}
                            onChange={this.handleEditorChange}
                        />
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

export default EditorPage;