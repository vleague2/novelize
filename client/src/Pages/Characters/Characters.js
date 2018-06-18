// REQUIRED IMPORTS
import React, {Component} from "react";
import "./Characters.css";
import {Row, Col} from "../../Components/Grid";
import CharacterCardEdit from "../../Components/CharacterCardEdit";
import { Editor } from '@tinymce/tinymce-react';
import BackButton from "../../Components/BackButton";
import Button from "../../Components/Button";
import AddAnItem from "../../Components/AddAnItem";
import {FormFieldInput} from "../../Components/Form";
import API from "../../utils/API";

// CREATING A STATEFUL COMPONENT
class CharacterPage extends Component {
    constructor(props) {
        super(props);

        // INITIALIZE THE STATE
        this.state = {
            characters: [],
            editor: "",
            character_select: "",
            name: "",
            preview_text: "",
            character_image: ""
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);

        // BIND FOR ADDD NEW CHARACTER CLICK
        this.addNewChar = this.addNewChar.bind(this);
    }

//************ AS SOON AS THE APP LOADS
    componentDidMount() {

        // CALL THE FUNCTION TO UPDATE THE CHARACTER LIST
        this.updateCharList()
        .then(data => {    

            //UPDATE STATE WITH TEXT OF FIRST CHARACTER (FOR THE EDITOR), NAME OF FIRST CHARACTER, PREVIEW TEXT OF FIRST CHARACTER, AND IMAGE OF FIRST CHARACTER (FOR THE FORM FIELDS THAT DISPLAY FIRST)
            this.setState({editor: data[0].character_text, name: data[0].name, preview_text: data[0].preview_text, character_select: data[0].id, character_image: data[0].character_image});

            // SET THE FIRST CHARACTER CARD TO ACTIVE SINCE THAT'S WHAT SHOWS FIRST
            this.changeClass(data[0].id, "active-char");
        });
    }

// **************** FUNCTION THAT CALLS THE API AND UPDATES THE STATE
    updateCharList = () => {

        // THIS FUNCTION WILL RETURN A PROMISE
        return new Promise((resolve, reject) => {

            // GRAB STORY ID FROM LOCAL STORAGE
            let storyId = localStorage.getItem("currentStoryId");

            // PING THE DATABASE TO GET AN UPDATED CHARACTER LIST
            API.getAll("characters", storyId)
            .then(res => {

                // IF THERE'S AN ERROR, IT MEANS THE USER ISN'T AUTHENTICATED
                if (res.data.error) {

                    // SEND THEM TO THE LOGIN PAGE
                    window.location.href="/login"
                }

                // IF THERE'S NO ERRORS, THEN PROCEED
                else {

                    // PULL OUT THE CHARACTER DATA
                    let data = res.data;

                    // IF WE DO GET DATA BACK FROM THE SERVER
                    if (data.length > 0) {

                        // DECODE THE DATA COMING IN
                        this.decode(data);

                        // UPDATE THE STATE WITH NEW CHARACTER DATA
                        this.setState({characters: data});

                        // RESOLVE THE PROMISE BECAUSE THINGS WORKED! SEND THE DATA BACK IN CASE WE NEED IT
                        resolve(data);
                    }

                    // IF WE DON'T GET DATA, THEN THE USER NEEDS TO CREATE A NEW CHARACTER
                    else {

                        // WE STILL NEED TO UPDATE THE CHARACTERS STATE
                        this.setState({characters:data});

                        // AND TRIGGER THE MODAL TO OPEN SO THEY HAVE TO ADD A CHARACTER
                        this.forceAddCharacter();

                        // REJECT THE PROMISE SO NO OTHER CODE RUNS
                        reject(data);
                    }
                }
            })

            // IF THERE'S AN ERROR
            .catch(err => {

                // IT MAY READ THE LOGIN ERROR AS AN ERROR SO.... SEND THEM TO THE LOGIN PAGE
                window.location.href="/login"

                // REJECT THE PROMISE
                reject(err);
            })
        })
    }

// ************* FUNCTION TO DECODE THE DATA COMING FROM THE DB
decode = (data) => {

    // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY FOR THE USER
    data.forEach(character => {
        character.name = decodeURIComponent(character.name)

         // IF THE CHARACTER TEXT ISN'T NULL
         if (character.character_text !== null) {

            // THEN GO AHEAD AND DECODE IT
            character.character_text = decodeURIComponent(character.character_text);
        }

        // OTHERWISE JUST SET IT TO EMPTY SO IT DOESN'T SAY "NULL" ON THE FRONT END
        else {
            character.character_text = "";
        }

        character.preview_text = decodeURIComponent(character.preview_text);
        character.character_image = decodeURIComponent(character.character_image);
    })
}


//*************** FUNCTION THAT FORCES THE USER TO ADD A CHARACTER
    forceAddCharacter = () => {
        // ALL OF THESE CHANGES WILL FORCE THE USER TO INTERACT WITH THE MODAL TO ADD A CHARACTER

        // DISABLE CLICK AWAY FROM MODAL TO CLOSE
        document.getElementById("add-char-modal").setAttribute("data-backdrop","static");

        // DISABLE HIT ESCAPE KEY TO CLOSE
        document.getElementById("add-char-modal").setAttribute("data-keyboard","false");

        // SIMULATE A CLICK ON THE BUTTON THAT OPENS THE MODAL
        document.getElementById("add-char-prompt").click();

        // CHANGE THE MODAL TITLE SO IT MAKES MORE SENSE FOR A FIRST-TIME USER
        document.getElementById("modal-title").innerHTML = "Add a new character!";

        // REMOVE THE X BUTTON
        document.getElementById("x-button").style.display = "none";

        // REMOVE THE CLOSE BUTTON
        document.getElementById("close-button").style.display = "none";
    }

//*************** FUNCTION TO CHANGE THE CLASS OF THE CARDS
    changeClass(id, active) {

        // WE'LL PASS IN THE ACTIVE CLASS
        document.getElementById(id).setAttribute("class", `card rounded-0 ${active}`);
    }

// ************* FUNCTION TO HANDLE WHEN USER CLICKS ON EDIT FOR ANY CHARACTER
    handleClick(e) {
       
        // SET THE DATABASE ID OF THE CHARACTER
        let id = e.target.id;

        // PASS IN PARAMETER TO UPDATE EDITOR
        this.updateEditor(id);
    }

// ************** FUNCTION TO UPDATE THE EDITOR
    updateEditor = (id) => {

        // INIT NEW CHARACTER VALUES THAT WE WILL PUSH TO THE STATE TO UPDATE THE EDITING FIELDS
        let newCharName = "";
        let newCharPreview = "";
        let newCharText = "";
        let newCharImage = "";

        // LOOP THROUGH CHARACTERS 
        this.state.characters.forEach(character => {

            // IF THE CHARACTER ID MATCHES THE SELECTED ID
            if (character.id == id) {

                // PULL OUT VALUES FROM STATE ITEMS AND ASSIGN TO NEW CHARACTER VALUES
                newCharName = character.name;
                newCharPreview = character.preview_text;
                newCharText = character.character_text;
                newCharImage = character.character_image;

                // CHANGE CLASS OF THAT CARD TO ACTIVE
                this.changeClass(character.id, "active-char");
            }

            // IF IT'S NOT THE RIGHT CHARACTER
            else {

                // REMOVE ACTIVE CLASS
                this.changeClass(character.id);
            }
        })

        // SET THE ID, SET THE NAME, SET THE PREVIEW, SET THE IMAGE
        this.setState(
            {
                character_select: id, 
                name: newCharName,
                preview_text: newCharPreview, 
                character_image: newCharImage
            });

        // SELECT THE IFRAME THAT HOLDS THE EDITOR AND REPLACE IT WITH THE NEW CHARACTER TEXT
        window.frames['text-editor-char_ifr'].contentDocument.getElementById('tinymce').innerHTML = newCharText;
    }

//  ************** FUNCTION TO HANDLE WHEN THE CHARACTER NAME OR PREVIEW IS UPDATED BY THE USER
    handleInputChange = (e) => {

        // THIS WILL BE THE COLUMN NAME, SO WE ARE PULLING OUT THE NAME ATTRIBUTE OF THE INPUT FIELD
        let name = e.target.name;

        // THIS WILL BE THE NEW VALUE FOR THE COLUMN, SO WE ARE PULLING OUT THE VALUE ATTRIBUTE OF THE INPUT FIELD
        let value = e.target.value;

        // UPDATE THE STATE -- WHATEVER THE COLUMN NAME IS AND ITS NEW VALUE
        this.setState({[name]: value});

        // PING THE DATABASE TO UPDATE THE CHARACTER
        API.updateOne("characters", this.state.character_select, name, value)
        .then(res => {

            // GET AN UPDATED CHARACTER LIST
            this.updateCharList();
        }) 
    }

// ****************** EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        
        //API POST CALL TO THE SERVER, SENDING IN URL, ID, COLUMN NAME, AND CONTENT OF EDITOR
        API.updateOne("characters", this.state.character_select, "character_text", e.target.getContent())
        .then(res => {

            //GET UPDATED CHARACTER LIST TO RENDER THE CHANGES
            this.updateCharList();
        })
    }

// **************** FUNCTION TO HANDLE WHEN THE USER SAVES A NEW CHARACTER
    addNewChar = () => {

        // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST CHARACTER, WE NEED TO FIX THE MODAL STUFF WE BROKE TO FORCE THEM TO ADD A CHARACTER

            // LET THE USER CLICK AWAY TO CLOSE THE MODAL
            document.getElementById("add-char-modal").setAttribute("data-backdrop","true");

            // LET THEM USE THE ESCAPE KEY TO CLOSE THE MODAL
            document.getElementById("add-char-modal").setAttribute("data-keyboard","true");

            // RESET THE TITLE TEXT
            document.getElementById("modal-title").innerHTML = "Add a character";

            // SHOW THE X BUTTON
            document.getElementById("x-button").style.display = "inline";

            // SHOW THE CLOSE BUTTON
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
        .then(newCharRes => {

            // EMPTY MODAL
            document.getElementById("add-name-input").value = "";
            document.getElementById("add-preview-input").value = "";
            document.getElementById("add-image-input").value = "";

            // PING THE DATABASE TO GET AN UPDATED CHARACTER LIST
            this.updateCharList()
            .then(res => {

                // UPDATE THE EDITOR WITH THE NEW CHARACTER DATA
                this.updateEditor(newCharRes.data.id)
            })
        })
    }

// ************* FUNCTION TO DELETE A CHARACTER FROM THE DB
    deleteChar = () => {

        // GRAB ID OF CHARACTER FROM STATE
        let id = this.state.character_select;

        // PING API TO DELETE A CHARACTER
        API.deleteOne("characters", id)
        .then(res => {
            console.log(res);

            // GRAB STORY ID FROM LOCAL STORAGE
            let storyId = localStorage.getItem("currentStoryId");

            // PING THE DATABASE TO GET AN UPDATED CHARACTER LIST (USING THIS INSTEAD OF UPDATE FUNCTION BECAUSE OTHER STUFF HAS TO HAPPEN)
            API.getAll("characters", storyId)
            .then(res => {

                // PULL OUT THE CHARACTER DATA
                let data = res.data;

                // IF WE DO GET DATA BACK FROM THE SERVER
                if (data.length > 0) {

                    // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY FOR THE USER
                    data.forEach(character => {
                        character.name = decodeURIComponent(character.name)
                        character.preview_text = decodeURIComponent(character.preview_text);

                        // IF THE CHARACTER TEXT ISN'T NULL
                        if (character.character_text !== null) {

                            // THEN GO AHEAD AND DECODE IT
                            character.character_text = decodeURIComponent(character.character_text);
                        }

                        // OTHERWISE JUST SET IT TO EMPTY SO IT DOESN'T SHOW "NULL"
                        else {
                            character.character_text = "";
                        }

                        character.character_image = decodeURIComponent(character.character_image)
                    })

                    // UPDATE THE STATE WITH NEW CHARACTER DATA
                    this.setState({characters: data});

                    // PULL THE ID OF THE FIRST ITEM IN THE CHARACTERS ARRAY SO WE CAN SEND IT TO THE UPDATE EDITOR FUNCTION (WE NEED TO DISPLAY SOMETHING ELSE TO EDIT WHEN THE CHARACTER IS DELETED)
                    let newSelectId = this.state.characters[0].id;

                    // UPDATE THE EDITOR
                    this.updateEditor(newSelectId);
                }

                // IF WE DON'T GET DATA BACK FROM THE SERVER
                else {

                    // UPDATE THE STATE WITH CURRENT DATA
                    this.setState({characters:data});

                    // FORCE USER TO ADD A CHARACTER
                    this.forceAddCharacter();
                }
            })
        })
    }

// ************** RENDER THINGS TO THE PAGE
    render() {
        return (
            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div id="char-edit">

                {/* THIS ROW HOLDS OUR ENTIRE PAGE, BASICALLY */}
                <Row id="editor-char-row">

                    {/* LEFTHAND COLUMN, WHICH HOLDS THE EDITOR */}
                    <Col size="8" p="pr-0" id="editor-char-col">

                        {/* SUB-ROW TO HOLD THE BACK BUTTON, CHAR NAME EDIT, AND CHAR PREVIEW EDIT */}
                        <Row>

                            {/* A TINY COLUMN TO HOLD THE BACK ARROW */}
                            <Col size="1">

                                {/* IT TAKES YOU BACK TO THE EDITOR */}
                                <BackButton/>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM LABEL */}
                            <Col size="1">

                                {/* LABEL FOR THE NAME FIELD */}
                                <p className="mt-3 form-text text-right">Name</p>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM INPUT FOR NAME */}
                            <Col size="4">

                                {/* INPUT FIELD FOR UPDATING THE CHARACTER NAME */}
                                <FormFieldInput 
                                    id="name-input" 
                                    value={this.state.name} 
                                    name="name" 
                                    onChange={this.handleInputChange}
                                />
                            </Col>

                            {/* COLUMN TO HOLD THE FORM LABEL FOR IMAGE */}
                            <Col size="1">

                                {/* IMAGE LABEL */}
                                <p className="mt-3 form-text text-right">Image</p>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM INPUT FOR IMAGE */}
                            <Col size="4">

                                {/* FORM INPUT FOR THE IMAGE */}
                                <FormFieldInput 
                                    id="image-input" 
                                    value={this.state.character_image} 
                                    name="character_image" 
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>

                        {/* ANOTHER ROW FOR THE NEXT FORM ROW */}
                        <Row>

                            {/* COLUMN TO HOLD THE FORM LABEL FOR BIO */}
                            <Col size="2">

                                {/* FORM LABEL FOR BIO */}
                                <p className="text-right mt-3 form-text">One-line Bio</p>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM INPUT FOR PREVIEW TEXT */}
                            <Col size="7">

                                {/* FORM INPUT FIELD FOR PREVIEW */}
                                <FormFieldInput
                                    id="preview-input" 
                                    value={this.state.preview_text} 
                                    name="preview_text" 
                                    onChange={this.handleInputChange}
                                />
                            </Col>

                            {/* COLUMN TO HOLD THE DELETE BUTTON */}
                            <Col size="2">

                                {/* DELETE BUTTON */}
                                <Button className="btn-danger delete-btn" onClick={this.deleteChar}>Delete Character </Button>
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
                                toolbar: 'insert | undo redo |  formatselect | bold italic forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',

                                // HIDE THE MENU BAR SO THE USER CAN'T CREATE NEW FILES AND SUCH
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
                    <Col size="4" p="pr-0 pl-0" m="mr-0" id="char-list-col">

                        {/* MAP THROUGH OUR CHARACTERS FROM THE STATE */}
                        {this.state.characters.map(character => {

                            // CREATE CHARACTER CARD WITH ATTRIBUTES FOR EACH
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
                                <Button className="close" dataDismiss="modal" ariaLabel="Close">
                                    <span aria-hidden="true" id="x-button">&times;</span>
                                </Button>
                            </div>

                            {/* BODY OF THE MODAL */}
                            <div className="modal-body">

                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="add-name-input" className="label-title">Character Name</label>
                                    <FormFieldInput id="add-name-input" name="name" placeholder="Jane Doe" />
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
                                <Button className="btn btn-secondary" dataDismiss="modal" id="close-button">Close</Button>

                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <Button className="btn btn-save-modal" id="add-new-char" onClick={this.addNewChar} dataDismiss="modal">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterPage;