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

    // AS SOON AS PAGE LOADS
    componentDidMount() {

        //API CALL TO SERVER TO GET CHARACTER LIST
        axios.get("/api/characters")
        .then(res => {
            //PULL ARRAY FROM SERVER RESPONSE
            let data = res.data;

            //UPDATE STATE WITH CHARACTER LIST
            this.setState({characters: data});

            console.log(this.state.characters);

        });

        //API CALL TO SERVER TO GET STORY FOR INITIAL VALUE OF EDITOR
        axios.get("/api/story")
        .then(res => {
            //PULL STORY FROM SERVER RESPONSE
            let story = res.data.story_text;

            //UPDATE STATE WITH STORY TEXT
            this.setState({story: story})
        })
    }

    //HANDLE CLICKS FOR TABS
    handleClick(e) {

        //PULL ID OF CLICKED TAB
        let tab = e.target.id;

        //DECIDE WHAT TO DO BASED ON WHAT ID IT IS
        switch (tab) {
            //IF IT'S CHARACTER TAB
            case "char_tab": 
                //UPDATE COLORS OF CHARACTER TAB
                document.getElementById("char_tab").style.backgroundColor = "#343a40";
                document.getElementById("char_tab").style.color = "#f8f9fa";
                //UPDATE COLORS OF PLOT TAB
                document.getElementById("plot_tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("plot_tab").style.color = "#343a40";
                break;
            //IF IT'S PLOT TAB
            case "plot_tab":
                // UPDATE COLORS OF CHARACTER TAB
                document.getElementById("char_tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("char_tab").style.color = "#343a40";
                //UPDATE COLORS OF PLOT TAB
                document.getElementById("plot_tab").style.backgroundColor = "#343a40";
                document.getElementById("plot_tab").style.color = "#f8f9fa";
                break;
            //IF IT'S NEITHER OF THOSE
            default:
                //THEN THINGS ARE DEFINITELY BROKEN
                console.log("RIP Me");
        }
    }

    //EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        //API POST CALL TO THE SERVER 
        axios.post('/api/story', {
            // SEND THE CONTENT OF THE EDITOR
            story: e.target.getContent()
        }).then(res => {
            // CONSOLE LOG THE RESPONSE BECAUSE WE DON'T ACTUALLY HAVE TO DO ANYTHING ELSE
            console.log(res.data.story_text);
        })
    }

    render() {
        return (
            // CONTAINER DIV
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
                            <p className="justify-content-center text-center mt-2 mb-2">
                                <a href="/character-edit" className="edit-fullscreen">Edit fullscreen <i className="fas fa-angle-right"></i></a>
                            </p>

                            {/* MAP THROUGH THE CHARACTER ARRAY IN THE STATE AND ADD A CHARACTER CARD FOR EACH */}
                            {this.state.characters.map(character => {
                                console.log("crying");
                                return <CharacterCard 
                                    id={character.id} 
                                    title={character.name} 
                                    preview={character.preview_text} 
                                    key={character.id} 
                                    image={character.character_image} 
                                    profile={character.character_text}
                                />
                            })}
                        </div>    
                    </Col>

                    <Col size="6" id="editorCol">
                        {/*SET UP THE TEXT EDITOR*/}
                        <Editor
                            apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' 
                            cloudChannel='dev'
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
                                setup: function(ed) {
                                    ed.on('keydown', function(event) {
                                        if (event.keyCode == 9) { // tab pressed
                                            ed.execCommand('mceInsertContent', false, '&emsp;'); 
                                            event.preventDefault();
                                            return false;
                                        }
                                    });
                                }
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
                        <div>
                            <p className="justify-content-center text-center mt-2 mb-2">
                                <a href="/character-edit" className="edit-fullscreen">Edit fullscreen <i className="fas fa-angle-right"></i></a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditorPage;