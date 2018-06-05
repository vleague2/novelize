import React, {Component} from "react";
import axios from "axios";
import "./Characters.css";
import {Container, Row, Col} from "../../Components/Grid";
import CharacterCardEdit from "../../Components/CharacterCardEdit";
import { Editor } from '@tinymce/tinymce-react';

class CharacterPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            characters: [],
            editor: "",
            character_select: "1"
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        //API CALL TO SERVER TO GET CHARACTER LIST
        axios.get("/api/characters")
        .then(res => {
            //PULL ARRAY FROM SERVER RESPONSE
            let data = res.data;

            //UPDATE STATE WITH CHARACTER LIST
            this.setState({characters: data, editor: data[0].character_text});

            console.log(this.state.characters);

        });
    }

    handleClick(e) {
        console.log(e.target.id);
        // the database id of the character
        let id = e.target.id;
        // the array id of the character
        let idArrayNum = id - 1;
        // set the state to the database id because we will send it to the db
        this.setState({character_select: id})
        console.log("current character num: " + this.state.character_select);
        let newCharText = this.state.characters[idArrayNum].character_text;    
        console.log(newCharText);    
        // this.setState({editor: newCharText});

        // console.log(document.getElementById("textEditor-char_ifr"))
        window.frames['textEditor-char_ifr'].contentDocument.getElementById('tinymce').innerHTML= newCharText;
    }

    //EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        console.log("current character num: " + this.state.character_select);

        console.log(e.target.getContent());
        
        //API POST CALL TO THE SERVER 
        axios.post('/api/characters/' + this.state.character_select, {
            // SEND THE CONTENT OF THE EDITOR
            character: e.target.getContent()
        }).then(res => {
            // CONSOLE LOG THAT WE'RE SAVING BECAUSE WE DON'T ACTUALLY HAVE TO DO ANYTHING ELSE
            console.log(res);

            //API CALL TO SERVER TO GET CHARACTER LIST
            axios.get("/api/characters")
            .then(res => {
                //PULL ARRAY FROM SERVER RESPONSE
                let data = res.data;

                //UPDATE STATE WITH CHARACTER LIST
                this.setState({characters: data});

                console.log(this.state.characters);

            });
        })
        
    }

    render() {
        return (
            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div id="char-edit">
                {/* THIS ROW HOLDS OUR ENTIRE PAGE, BASICALLY */}
                <Row id="charEditorRow">
                    <Col size="8" id="editor-char-col">
                        {/*SET UP THE TEXT EDITOR*/}
                        <Editor
                            apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' 
                            cloudChannel='dev'
                            // DROPPING IN THE STATE VALUE TO POPULATE THE EDITOR INITIALLY
                            initialValue={`<p>${this.state.editor}</p>`}
                            id="textEditor-char"
                            
                            // INITIALIZE A BUNCH OF THINGS
                            init={{
                                // FUNCTIONALITY PLUGINS
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor textcolor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table contextmenu paste code help wordcount'
                                ],
                                // EDITING OPTIONS
                                toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                // HIDE THE MENU BAR FOR FILE STUFF
                                menubar: false,
                                // ADD IN SOME CSS FOR FONTS AND SUCH
                                content_css: [
                                    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                    '//www.tinymce.com/css/codepen.min.css'],
                                height: 496,
                                // MAKE SURE THE USER CAN HIT TAB TO ACTUALLY MAKE A TAB
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

                    <Col size="4" id="char-list-col">
                        {this.state.characters.map(character => {
                            console.log("crying");
                            // CREATE CHARACTER CARD WITH ATTRIBUTES
                            return <CharacterCardEdit 
                                id={character.id} 
                                title={character.name} 
                                preview={character.preview_text} 
                                key={character.id} 
                                image={character.character_image} 
                                onClick={this.handleClick}
                            />
                        })}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CharacterPage;