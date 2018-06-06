import React, {Component} from "react";
import axios from "axios";
import "./Characters.css";
import {Row, Col} from "../../Components/Grid";
import CharacterCardEdit from "../../Components/CharacterCardEdit";
import { Editor } from '@tinymce/tinymce-react';

class CharacterPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            characters: [],
            editor: "",
            character_select: "1",
            name: "",
            preview_text: ""
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);

        // BIND FOR CLICK
        this.addNewChar = this.addNewChar.bind(this);
    }

    componentDidMount() {

        //API CALL TO SERVER TO GET CHARACTER LIST
        axios.get("/api/characters")
        .then(res => {
            //PULL ARRAY FROM SERVER RESPONSE
            let data = res.data;

            //UPDATE STATE WITH CHARACTER LIST
            this.setState({characters: data, editor: data[0].character_text, name: data[0].name, preview_text: data[0].preview_text});

            console.log(this.state.characters);

            document.getElementById("1").setAttribute("class", "card rounded-0 active-char");

        });

        
    }

    handleClick(e) {
        console.log(e.target.id);
        // the database id of the character
        let id = e.target.id;
        // the array id of the character
        let idArrayNum = id - 1;
        // the name of the newly selected character
        let newCharName = this.state.characters[idArrayNum].name;
        // the preview of the newly selected character
        let newCharPreview = this.state.characters[idArrayNum].preview_text;
        // set the state to the database id because we will send it to the db
        this.setState({character_select: id, name: newCharName, preview_text: newCharPreview});
        
        console.log("current character num: " + this.state.character_select);

        // CREATE A VARIABLE TO HOLD THE CHARACTER TEXT OF THE NEW SELECTED CHARACTER
        let newCharText = this.state.characters[idArrayNum].character_text;          

        // SELECT THE IFRAME THAT HOLDS THE EDITOR AND REPLACE IT WITH THE NEW CHARACTER TEXT
        window.frames['textEditor-char_ifr'].contentDocument.getElementById('tinymce').innerHTML= newCharText;

        // MAKE THAT CHARACTER CARD ACTIVE
        this.state.characters.forEach(character => {
            if (character.id == id) {
                document.getElementById(character.id).setAttribute("class", "card rounded-0 active-char");
            }

            else {
                document.getElementById(character.id).setAttribute("class", "card rounded-0")
            }
        })
        // document.getElementById(id).setAttribute("class", "active-char");
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
        console.log(this.state.name)
        console.log(this.state.preview_text)

        axios.post('/api/characters/' + this.state.character_select, {
            column: name,
            content: value
        }).then(res => {
            console.log(res);
            axios.get('/api/characters')
            .then(res => {
                let data = res.data;
                this.setState({characters: data});
                console.log(this.state.characters);
            })
        }) 
    }

    //EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        console.log("current character num: " + this.state.character_select);

        console.log(e.target.getContent());
        
        //API POST CALL TO THE SERVER 
        axios.post('/api/characters/' + this.state.character_select, {
            // SEND THE CONTENT OF THE EDITOR
            column: "character_text",
            content: e.target.getContent()
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

    addNewChar = () => {
        let name = document.getElementById("add-name-input").value;
        let preview = document.getElementById("add-preview-input").value;
        let image = document.getElementById("add-image-input").value;
        
        axios.post("/api/new/character", {
            name: name,
            preview: preview,
            image: image
        })
        .then(res => {
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
                        <Row>
                            <Col size="1">
                                <a href="/editor" className="ml-3" title="Back to Editor"><i className="fas fa-arrow-circle-left text-left mt-3" id="back-arrow"></i></a>
                            </Col>
                            <Col size="2">
                                <p className="mt-3 form-text text-right">Name</p>
                            </Col>
                            <Col size="8">
                                <input type="text" className="form-control mt-2 mr-2" id="name-input" value={this.state.name} name="name" onChange={this.handleInputChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col size="3">
                                <p className="text-right mt-3 form-text">Preview</p>
                            </Col>
                            <Col size="8">
                                <input type="text" className="form-control mt-2 mr-2" id="preview-input" value={this.state.preview_text} name="preview_text" onChange={this.handleInputChange}/>
                            </Col>
                        </Row>
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
                                height: 386,
                                // MAKE SURE THE USER CAN HIT TAB TO ACTUALLY MAKE A TAB
                                setup: function(ed) {
                                    ed.on('keydown', function(event) {
                                        if (event.keyCode === 9) { // tab pressed
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
                        <p className="justify-content-center text-center mt-4 mb-4" data-toggle="modal" data-target="#add-char-modal" id="add-char-prompt">Add a Character <i className="fas fa-plus"></i></p>
                    </Col>
                </Row>

                <div className="modal fade" tabIndex="-1" role="dialog" id="add-char-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add a Character</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="add-name-input">Character Name</label>
                                    <input type="text" className="form-control mt-2 mr-2" id="add-name-input"  name="name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-preview-input">One-line bio</label>
                                    <input type="text" className="form-control mt-2 mr-2" id="add-preview-input" name="preview_text"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-image-input">Image Link</label>
                                    <input type="text" className="form-control mt-2 mr-2" id="add-image-input" name="image"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" id="add-new-char" onClick={this.addNewChar} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterPage;