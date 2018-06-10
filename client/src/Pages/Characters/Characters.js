import React, {Component} from "react";
import "./Characters.css";
import {Row, Col} from "../../Components/Grid";
import CharacterCardEdit from "../../Components/CharacterCardEdit";
import { Editor } from '@tinymce/tinymce-react';
import BackButton from "../../Components/BackButton";
import AddAnItem from "../../Components/AddAnItem";
import {FormFieldInput} from "../../Components/Form";
import API from "../../utils/API";

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

        // GRAB STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        // GET CHARACTER LIST FROM DB
        API.getAll("characters", storyId)
        .then(res => {

            //PULL ARRAY FROM SERVER RESPONSE
            let data = res.data;

            // SEE IF WE HAVE ANY CHARACTERS FROM THE DATABASE. IF SO,
            if (data.length > 0) {
                // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
                data.forEach(character => {
                    character.name = decodeURIComponent(character.name)
                    character.character_text = decodeURIComponent(character.character_text);
                    character.preview_text = decodeURIComponent(character.preview_text);
                    character.image = decodeURIComponent(character.image);
                })

                //UPDATE STATE WITH CHARACTER LIST, SET THE FIRST CHARACTER INTO THE EDITOR, SET THE NAME TO THE FIRST CHARACTER'S NAME, AND SET THE PREVIEW TEXT TO THE FIRST CHARACTER'S PREVIEW TEXT
                this.setState({characters: data, editor: data[0].character_text, name: data[0].name, preview_text: data[0].preview_text});

                // SET THE FIRST CHARACTER CARD TO ACTIVE SINCE THAT'S WHAT SHOWS FIRST
                this.changeClass(data[0].id, "active-char");
            }
            // IF NOT, THE USER NEEDS TO ADD A CHARACTER
            else {
                // ALL OF THESE CHANGES WILL FORCE THE USER TO ADD THEIR FIRST CHARACTER BEFORE THE PAGE "SHOWS"
                document.getElementById("add-char-modal").setAttribute("data-backdrop","static");
                document.getElementById("add-char-modal").setAttribute("data-keyboard","false");
                document.getElementById("add-char-prompt").click();
                document.getElementById("modal-title").innerHTML = "Add your first character!";
                document.getElementById("x-button").style.display = "none";
                document.getElementById("close-button").style.display = "none";
            }
        });
    }

    // FUNCTION THAT CALLS THE API AND UPDATES THE STATE
    updateCharList = () => {

        // GRAB STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        // PING THE DATABASE TO GET AN UPDATED CHARACTER LIST
        API.getAll("characters", storyId)
        .then(res => {
            // PULL OUT THE CHARACTER DATA
            let data = res.data;

            if (data.length > 0) {
                // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
                data.forEach(character => {
                    character.name = decodeURIComponent(character.name)
                    character.character_text = decodeURIComponent(character.character_text);
                    character.preview_text = decodeURIComponent(character.preview_text);
                    character.image = decodeURIComponent(character.image)
                })

                // UPDATE THE STATE WITH NEW CHARACTER DATA
                this.setState({characters: data});
            }
        })
    }

    // FUNCTION TO CHANGE THE CLASS OF THE CARDS
    changeClass(id, active) {
        document.getElementById(id).setAttribute("class", `card rounded-0 ml-1 ${active}`);
    }

    // FUNCTION TO HANDLE WHEN USER CLICKS ON EDIT FOR ANY CHARACTER
    handleClick(e) {
       
        // SET THE DATABASE ID OF THE CHARACTER
        let id = e.target.id;
        console.log("id: " + id);

        // PASS IN PARAMETER TO UPDATE EDITOR
        this.updateEditor(id);
    }

    // FUNCTION TO UPDATE THE EDITOR
    updateEditor = (id) => {

        // INIT NEW CHARACTER VALUES
        let newCharName = "";
        let newCharPreview = "";
        let newCharText = "";

        // LOOP THROUGH CHARACTERS 
        this.state.characters.forEach(character => {
            // IF THE CHARACTER ID MATCHES THE SELECTED ID
            if (character.id == id) {
                // PULL OUT VALUES AND REASSIGN TO CHARACTER VALUES
                newCharName = character.name;
                newCharPreview = character.preview_text;
                newCharText = character.character_text;

                // CHANGE CLASS OF THAT CARD TO ACTIVE
                this.changeClass(character.id, "active-char");
            }

            // IF NOT
            else {
                // REMOVE ACTIVE CLASS
                this.changeClass(character.id);
            }
        })

        // SET THE STATE TO THE DATABASE ID BECAUSE WE WILL SEND IT TO THE DB LATER, AND THEN SET THE NAME AND PREVIEW
        this.setState({character_select: id, name: newCharName, preview_text: newCharPreview});

        // SELECT THE IFRAME THAT HOLDS THE EDITOR AND REPLACE IT WITH THE NEW CHARACTER TEXT
        window.frames['text-editor-char_ifr'].contentDocument.getElementById('tinymce').innerHTML = newCharText;
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
        API.updateOne("characters", this.state.character_select, name, value)
        .then(res => {
            // GET AN UPDATED CHARACTER LIST
            this.updateCharList();
        }) 
    }

    //EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        
        //API POST CALL TO THE SERVER, SENDING IN URL, ID, COLUMN NAME, AND CONTENT OF EDITOR
        API.updateOne("characters", this.state.character_select, "character_text", e.target.getContent())
        .then(res => {
            // CONSOLE LOG THAT WE'RE SAVING
            console.log(res);

            //GET UPDATED CHARACTER LIST
            this.updateCharList();
        })
    }

    // FUNCTION TO HANDLE WHEN THE USER SAVES A NEW CHARACTER
    addNewChar = () => {

        // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST CHARACTER, WE NEED TO FIX THE STUFF WE BROKE TO FORCE THEM TO ADD A CHARACTER
        document.getElementById("add-char-modal").setAttribute("data-backdrop","true");
        document.getElementById("add-char-modal").setAttribute("data-keyboard","true");;
        document.getElementById("modal-title").innerHTML = "Add a character";
        document.getElementById("x-button").style.display = "inline";
        document.getElementById("close-button").style.display = "inline";

        // PULL OUT THE CHARACTER NAME FROM THE FORM
        let name = document.getElementById("add-name-input").value.trim();

        // PULL OUT THE PREVIEW TEXT FROM THE FORM
        let preview = document.getElementById("add-preview-input").value.trim();

        // PULL OUT THE IMAGE URL FROM THE FORM
        let image = document.getElementById("add-image-input").value.trim();

        // GRAB STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");
        
        // PING THE DATABASE TO ADD A NEW CHARACTER
        API.addNewCharacter(name, preview, image, storyId)
        .then(res => {

            // CONSOLE LOG THAT WE'VE ADDED A NEW CHARACTER
            console.log(res);
            
            //API CALL TO SERVER TO GET CHARACTER LIST
            this.updateCharList();

            // EMPTY MODAL
            document.getElementById("add-name-input").value = "";
            document.getElementById("add-preview-input").value = "";
            document.getElementById("add-image-input").value = "";
        })
    }

    // FUNCTION TO DELETE A CHARACTER FROM THE DB
    deleteChar = () => {
        // GRAB ID OF CHARACTER FROM STATE
        let id = this.state.character_select;

        // PING API TO DELETE A CHARACTER
        API.deleteOne("characters", id)
        .then(res => {
            console.log(res);

            // CALL DB TO UPDATE CHARACTER LIST
            this.updateCharList();

            // PULL THE ID OF THE FIRST ITEM IN THE CHARACTERS ARRAY SO WE CAN SEND IT TO THE UPDATE EDITOR FUNCTION
            let newSelectId = this.state.characters[0].id;

            // UPDATE THE EDITOR
            this.updateEditor(newSelectId);
        })
    }

    // RENDER THINGS TO THE PAGE
    render() {
        return (
            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div id="char-edit">
                {/* THIS ROW HOLDS OUR ENTIRE PAGE, BASICALLY */}
                <Row id="editor-char-row">

                    {/* LEFTHAND COLUMN, WHICH HOLDS THE EDITOR */}
                    <Col size="8" id="editor-char-col">

                        {/* SUB-ROW TO HOLD THE BACK BUTTON, CHAR NAME EDIT, AND CHAR PREVIEW EDIT */}
                        <Row>
                            {/* A TINY COLUMN TO HOLD THE BACK ARROW */}
                            <Col size="1">
                                {/* IT TAKES YOU BACK TO THE EDITOR */}
                                <BackButton/>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM LABEL */}
                            <Col size="2">
                                <p className="mt-3 form-text text-right">Name</p>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM INPUT FOR NAME */}
                            <Col size="6">
                                <FormFieldInput 
                                    id="name-input" 
                                    value={this.state.name} 
                                    name="name" 
                                    onChange={this.handleInputChange}
                                />
                                
                            </Col>
                            <Col size="3">
                                <button className="btn btn-danger delete-btn" onClick={this.deleteChar}>Delete Character </button>
                            </Col>
                        </Row>

                        {/* ANOTHER ROW FOR THE NEXT FORM PIECE */}
                        <Row>
                            {/* COLUMN TO HOLD THE FORM LABEL */}
                            <Col size="3">
                                <p className="text-right mt-3 form-text">One-line Bio</p>
                            </Col>
                            {/* COLUMN TO HOLD THE FORM INPUT FOR PREVIEW TEXT */}
                            <Col size="7">
                                <FormFieldInput
                                    id="preview-input" 
                                    value={this.state.preview_text} 
                                    name="preview_text" 
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                        {/*SET UP THE TEXT EDITOR*/}
                        <Editor
                            apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' 
                            cloudChannel='dev'
                            // DROPPING IN THE STATE VALUE TO POPULATE THE EDITOR INITIALLY
                            initialValue={`<p>${this.state.editor}</p>`}
                            id="text-editor-char"
                            
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
                        <AddAnItem
                            id="add-char-prompt"
                            target="#add-char-modal"
                        >Add a Character </AddAnItem>
                    </Col>
                </Row>

                {/* MODAL FOR ADDING A NEW CHARACTER */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="add-char-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* MODAL TITLE */}
                                <h5 className="modal-title" id="modal-title">Add a Character</h5>
                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" id="x-button">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="add-name-input" className="label-title">Character Name</label>
                                    <FormFieldInput id="add-name-input"  name="name" placeholder="Jane Doe" />
                                </div>
                                {/* FORM FIELD TO ADD PREVIEW */}
                                <div className="form-group">
                                    <label htmlFor="add-preview-input" className="label-title">One-line bio</label>
                                    <FormFieldInput id="add-preview-input" name="preview_text" placeholder="A quick overview of the character"/>
                                </div>
                                {/* FORM FIELD TO ADD IMAGE LINK */}
                                <div className="form-group">
                                    <label htmlFor="add-image-input" className="label-title">Image Link</label>
                                    <FormFieldInput id="add-image-input" name="image" placeholder="Square images look best!"/>
                                </div>
                            </div>
                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">
                                {/* CLOSE THE MODAL */}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close-button">Close</button>
                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <button type="button" className="btn btn-save-modal" id="add-new-char" onClick={this.addNewChar} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterPage;