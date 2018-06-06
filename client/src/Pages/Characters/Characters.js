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

        // BIND FOR ADDD NEW CHARACTER CLICK
        this.addNewChar = this.addNewChar.bind(this);
    }

    // AS SOON AS THE APP LOADS
    componentDidMount() {

        //API CALL TO SERVER TO GET CHARACTER LIST
        axios.get("/api/characters")
        .then(res => {

            //PULL ARRAY FROM SERVER RESPONSE
            let data = res.data;

            //UPDATE STATE WITH CHARACTER LIST, SET THE FIRST CHARACTER INTO THE EDITOR, SET THE NAME TO THE FIRST CHARACTER'S NAME, AND SET THE PREVIEW TEXT TO THE FIRST CHARACTER'S PREVIEW TEXT
            this.setState({characters: data, editor: data[0].character_text, name: data[0].name, preview_text: data[0].preview_text});

            // SET THE FIRST CHARACTER CARD TO ACTIVE SINCE THAT'S WHAT SHOWS FIRST
            document.getElementById("1").setAttribute("class", "card rounded-0 active-char");
        });
    }

    // FUNCTION TO HANDLE WHEN USER CLICKS ON EDIT FOR ANY CHARACTER
    handleClick(e) {
       
        // SET THE DATABASE ID OF THE CHARACTER
        let id = e.target.id;

        // SET THE ARRAY ID OF THE CHARACTER 
        let idArrayNum = id - 1;

        // SET THE NAME OF THE NEWLY SELECTED CHARACTER USING THE ARRAY ID
        let newCharName = this.state.characters[idArrayNum].name;

        // SET THE PREVIEW TEXT OF THE NEWLY SELECTED CHARACTER USING THE ARRAY ID
        let newCharPreview = this.state.characters[idArrayNum].preview_text;

        // SET THE STATE TO THE DATABASE ID BECAUSE WE WILL SEND IT TO THE DB LATER, AND THEN SET THE NAME AND PREVIEW
        this.setState({character_select: id, name: newCharName, preview_text: newCharPreview});

        // CREATE A VARIABLE TO HOLD THE CHARACTER TEXT OF THE NEW SELECTED CHARACTER
        let newCharText = this.state.characters[idArrayNum].character_text;          

        // SELECT THE IFRAME THAT HOLDS THE EDITOR AND REPLACE IT WITH THE NEW CHARACTER TEXT
        window.frames['textEditor-char_ifr'].contentDocument.getElementById('tinymce').innerHTML= newCharText;

        // MAKE THAT CHARACTER CARD ACTIVE BY LOOPING THRU CHARACTER ARRAY
        this.state.characters.forEach(character => {
            // IF THE CHARACTER ID MATCHES THE SELECTED ID
            if (character.id == id) {
                // CHANGE CLASS TO ACTIVE
                document.getElementById(character.id).setAttribute("class", "card rounded-0 active-char");
            }

            // IF NOT
            else {
                // REMOVE ACTIVE CLASS
                document.getElementById(character.id).setAttribute("class", "card rounded-0")
            }
        })
    }

    // FUNCTION TO HANDLE WHEN THE CHARACTER NAME OR PREVIEW IS UPDATED
    handleInputChange = (e) => {
        // THIS WILL BE THE COLUMN NAME, SO WE ARE PULLING OUT THE NAME ATTRIBUTE OF THE INPUT FIELD
        let name = e.target.name;

        // THIS WILL BE THE NEW VALUE FOR THE COLUMN, SO WE ARE PULLING OUT THE VALUE ATTRIBUTE OF THE INPUT FIELD
        let value = e.target.value;

        // UPDATE THE STATE -- WHATEVER THE COLUMN NAME IS AND ITS NEW VALUE
        this.setState({[name]: value});

        // PING THE DATABASE TO UPDATE THE CHARACTER, AND CONCATENATE THE ID OF THE SELECTED CHAR
        axios.post('/api/characters/' + this.state.character_select, {
            // SEND IN THE COLUMN AND CONTENT
            column: name,
            content: value
        }).then(res => {
            // PING THE DATABASE TO GET AN UPDATED CHARACTER LIST
            axios.get('/api/characters')
            .then(res => {
                // PULL OUT THE CHARACTER DATA
                let data = res.data;

                // UPDATE THE STATE WITH NEW CHARACTER DATA
                this.setState({characters: data});
            })
        }) 
    }

    //EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        
        //API POST CALL TO THE SERVER 
        axios.post('/api/characters/' + this.state.character_select, {
            // SEND THE CONTENT OF THE EDITOR
            column: "character_text",
            content: e.target.getContent()
        }).then(res => {
            // CONSOLE LOG THAT WE'RE SAVING
            console.log(res);

            //API CALL TO SERVER TO GET CHARACTER LIST
            axios.get("/api/characters")
            .then(res => {
                //PULL ARRAY FROM SERVER RESPONSE
                let data = res.data;

                //UPDATE STATE WITH CHARACTER LIST
                this.setState({characters: data});
            });
        })
    }

    // FUNCTION TO HANDLE WHEN THE USER SAVES A NEW CHARACTER
    addNewChar = () => {

        // PULL OUT THE CHARACTER NAME FROM THE FORM
        let name = document.getElementById("add-name-input").value;

        // PULL OUT THE PREVIEW TEXT FROM THE FORM
        let preview = document.getElementById("add-preview-input").value;

        // PULL OUT THE IMAGE URL FROM THE FORM
        let image = document.getElementById("add-image-input").value;
        
        // PING THE DATABASE TO ADD A NEW CHARACTER
        axios.post("/api/new/character", {
            // SEND IN ALL THE DATA
            name: name,
            preview: preview,
            image: image
        })
        .then(res => {

            // CONSOLE LOG THAT WE'VE ADDED A NEW CHARACTER
            console.log(res);
            
            //API CALL TO SERVER TO GET CHARACTER LIST
            axios.get("/api/characters")
            .then(res => {
                //PULL ARRAY FROM SERVER RESPONSE
                let data = res.data;

                //UPDATE STATE WITH CHARACTER LIST
                this.setState({characters: data});
            });
        })
    }

    // RENDER THINGS TO THE PAGE
    render() {
        return (
            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div id="char-edit">
                {/* THIS ROW HOLDS OUR ENTIRE PAGE, BASICALLY */}
                <Row id="charEditorRow">

                    {/* LEFTHAND COLUMN, WHICH HOLDS THE EDITOR */}
                    <Col size="8" id="editor-char-col">

                        {/* SUB-ROW TO HOLD THE BACK BUTTON, CHAR NAME EDIT, AND CHAR PREVIEW EDIT */}
                        <Row>
                            {/* A TINY COLUMN TO HOLD THE BACK ARROW */}
                            <Col size="1">
                                {/* IT TAKES YOU BACK TO THE EDITOR */}
                                <a href="/editor" className="ml-3" title="Back to Editor"><i className="fas fa-arrow-circle-left text-left mt-3" id="back-arrow"></i></a>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM LABEL */}
                            <Col size="2">
                                <p className="mt-3 form-text text-right">Name</p>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM INPUT FOR NAME */}
                            <Col size="8">
                                <input type="text" className="form-control mt-2 mr-2" id="name-input" value={this.state.name} name="name" onChange={this.handleInputChange}/>
                            </Col>
                        </Row>

                        {/* ANOTHER ROW FOR THE NEXT FORM PIECE */}
                        <Row>
                            {/* COLUMN TO HOLD THE FORM LABEL */}
                            <Col size="3">
                                <p className="text-right mt-3 form-text">Preview</p>
                            </Col>
                            {/* COLUMN TO HOLD THE FORM INPUT FOR PREVIEW TEXT */}
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

                    {/* THE RIGHT-HAND COLUMN, WHICH HOLDS OUR CHARACTER LIST */}
                    <Col size="4" id="char-list-col">
                        {/* MAP THROUGH OUR CHARACTERS FROM THE STATE */}
                        {this.state.characters.map(character => {

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

                        {/* LINK TO ADD A CHARACTER, WHICH WILL BRING UP A MODAL */}
                        <p className="justify-content-center text-center mt-4 mb-4" data-toggle="modal" data-target="#add-char-modal" id="add-char-prompt">Add a Character <i className="fas fa-plus"></i></p>
                    </Col>
                </Row>

                {/* MODAL FOR ADDING A NEW CHARACTER */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="add-char-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* MODAL TITLE */}
                                <h5 className="modal-title">Add a Character</h5>
                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="add-name-input">Character Name</label>
                                    <input type="text" className="form-control mt-2 mr-2" id="add-name-input"  name="name"/>
                                </div>
                                {/* FORM FIELD TO ADD PREVIEW */}
                                <div className="form-group">
                                    <label htmlFor="add-preview-input">One-line bio</label>
                                    <input type="text" className="form-control mt-2 mr-2" id="add-preview-input" name="preview_text"/>
                                </div>
                                {/* FORM FIELD TO ADD IMAGE LINK */}
                                <div className="form-group">
                                    <label htmlFor="add-image-input">Image Link</label>
                                    <input type="text" className="form-control mt-2 mr-2" id="add-image-input" name="image"/>
                                </div>
                            </div>
                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">
                                {/* CLOSE THE MODAL */}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
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