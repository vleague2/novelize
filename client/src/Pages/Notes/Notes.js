import React, {Component} from "react";
import "./Notes.css";
import {Row, Col} from "../../Components/Grid";
import WorldCardEdit from "../../Components/WorldCardEdit";
import { Editor } from '@tinymce/tinymce-react';
import BackButton from "../../Components/BackButton";
import AddAnItem from "../../Components/AddAnItem";
import {FormFieldInput} from "../../Components/Form";
import API from "../../utils/API";

class NotePage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            notes: [],
            editor: "",
            note_select: "1",
            title: ""
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);

        // BIND FOR ADD NEW NOTE CLICK
        this.addNewNote = this.addNewNote.bind(this);
    }

    // AS SOON AS THE APP LOADS
    componentDidMount() {

        //API CALL TO SERVER TO GET NOTE LIST
        API.getAll("notes")
        .then(res => {

            //PULL ARRAY FROM SERVER RESPONSE
            let data = res.data;

            //UPDATE STATE WITH NOTE LIST, SET THE FIRST NOTE ITEM INTO THE EDITOR, SET THE TITLE TO THE FIRST NOTE'S TITLE
            this.setState({notes: data, editor: data[0].note_text, title: data[0].title});

            // SET THE FIRST NOTE CARD TO ACTIVE SINCE THAT'S WHAT SHOWS FIRST
            this.changeClass("1", "active-world");
        });
    }

    // FUNCTION THAT CALLS THE API AND UPDATES THE STATE
    updateNoteList = () => {
        // PING THE DATABASE TO GET AN UPDATED NOTE LIST
        API.getAll("notes")
        .then(res => {
            // PULL OUT THE NOTE DATA
            let data = res.data;

            // UPDATE THE STATE WITH NEW NOTE DATA
            this.setState({notes: data});
        })
    }

    // FUNCTION TO CHANGE THE CLASS OF THE CARDS
    changeClass(id, active) {
        document.getElementById(id).setAttribute("class", `card rounded-0 ml-1 ${active}`);
    }

    // FUNCTION TO HANDLE WHEN USER CLICKS ON EDIT FOR ANY NOTE ITEM
    handleClick(e) {
       
        // SET THE DATABASE ID OF THE NOTE
        let id = e.target.id;

        // CALL UPDATE EDITOR FUNCTION
        this.updateEditor(id);
    }

    // FUNCTION TO UPDATE THE EDITOR
    updateEditor = (id) => {

        // INIT NEW NOTE VALUES
        let newNoteTitle = "";
        let newNoteText = "";

        // LOOP THROUGH NOTES 
        this.state.notes.forEach(note => {
            // IF THE NOTE ID MATCHES THE SELECTED ID
            if (note.id == id) {
                // PULL OUT VALUE AND REASSIGN TO NOTE VALUE
                newNoteTitle = note.title;
                newNoteText = note.note_text;

                // CHANGE CLASS OF THAT CARD TO ACTIVE
                this.changeClass(note.id, "active-world");
            }

            // IF NOT
            else {
                // REMOVE ACTIVE CLASS
                this.changeClass(note.id);
            }
        })

        // SET THE STATE TO THE DATABASE ID BECAUSE WE WILL SEND IT TO THE DB LATER, AND THEN SET THE NAME AND PREVIEW
        this.setState({note_select: id, title: newNoteTitle});

        // SELECT THE IFRAME THAT HOLDS THE EDITOR AND REPLACE IT WITH THE NEW NOTE TEXT
        window.frames['textEditor-note_ifr'].contentDocument.getElementById('tinymce').innerHTML = newNoteText;
    }

    // FUNCTION TO HANDLE WHEN THE NOTE NAME IS UPDATED
    handleInputChange = (e) => {
        // THIS WILL BE THE COLUMN NAME, SO WE ARE PULLING OUT THE NAME ATTRIBUTE OF THE INPUT FIELD
        let name = e.target.name;

        // THIS WILL BE THE NEW VALUE FOR THE COLUMN, SO WE ARE PULLING OUT THE VALUE ATTRIBUTE OF THE INPUT FIELD
        let value = e.target.value;

        // UPDATE THE STATE -- WHATEVER THE COLUMN NAME IS AND ITS NEW VALUE
        this.setState({[name]: value});

        // PING THE DATABASE TO UPDATE THE CHARACTER, AND CONCATENATE THE ID OF THE SELECTED NOTE
        API.updateOne("notes", this.state.note_select, name, value)
        .then(res => {
            // PING THE DATABASE TO GET AN UPDATED NOTE LIST
            this.updateNoteList();
        }) 
    }

    //EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        
        //API POST CALL TO THE SERVER 
        API.updateOne("notes", this.state.note_select, "note_text", e.target.getContent())
        .then(res => {
            // CONSOLE LOG THAT WE'RE SAVING
            console.log(res);

            //API CALL TO SERVER TO GET WORLD LIST
            this.updateNoteList();
        })
    }

    // FUNCTION TO HANDLE WHEN THE USER SAVES A NEW WORLD ITEM
    addNewNote = () => {

        // PULL OUT THE WORLD TITLE FROM THE FORM
        let title = document.getElementById("add-title-input").value;
        
        // PING THE DATABASE TO ADD A NEW WORLD
        API.addNewNote(title)
        .then(res => {

            // CONSOLE LOG THAT WE'VE ADDED A NEW WORLD
            console.log(res);
            
            //API CALL TO SERVER TO GET WORLD LIST
            this.updateNoteList();
            
            // EMPTY MODAL
            document.getElementById("add-title-input").value = "";
        })
    }

    // FUNCTION TO DELETE A NOTES ITEM FROM THE DB
    deleteNote = () => {
        // GRAB ID OF NOTE FROM STATE
        let id = this.state.note_select;

        // PING API TO DELETE A NOTE
        API.deleteOne("notes", id)
        .then(res => {
            console.log(res);

            // CALL DB TO UPDATE NOTE LIST
            this.updateNoteList();

            // PULL THE ID OF THE FIRST ITEM IN THE NOTES ARRAY SO WE CAN SEND IT TO THE UPDATE EDITOR FUNCTION
            let newSelectId = this.state.notes[0].id;

            // UPDATE THE EDITOR
            this.updateEditor(newSelectId);
        })
    }

    // RENDER THINGS TO THE PAGE
    render() {
        return (
            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div id="note-edit">
                {/* THIS ROW HOLDS OUR ENTIRE PAGE, BASICALLY */}
                <Row id="noteEditorRow">

                    {/* LEFTHAND COLUMN, WHICH HOLDS THE EDITOR */}
                    <Col size="8" id="editor-note-col">

                        {/* SUB-ROW TO HOLD THE BACK BUTTON, WORLD TITLE EDIT*/}
                        <Row>
                            {/* A TINY COLUMN TO HOLD THE BACK ARROW */}
                            <Col size="1">
                                {/* IT TAKES YOU BACK TO THE EDITOR */}
                                <BackButton/>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM LABEL */}
                            <Col size="2">
                                <p className="mt-3 form-text text-right">Title</p>
                            </Col>

                            {/* COLUMN TO HOLD THE FORM INPUT FOR NAME */}
                            <Col size="6">
                                <FormFieldInput id="title-input" value={this.state.title} name="title" onChange={this.handleInputChange}/>
                            </Col>

                            <Col size="3">
                                <button className="btn btn-danger delete-btn" onClick={this.deleteNote}>Delete Note </button>
                            </Col>
                        </Row>

                        {/*SET UP THE TEXT EDITOR*/}
                        <Editor
                            apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' 
                            cloudChannel='dev'
                            // DROPPING IN THE STATE VALUE TO POPULATE THE EDITOR INITIALLY
                            initialValue={`<p>${this.state.editor}</p>`}
                            id="textEditor-note"
                            
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
                                height: 446,
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

                    {/* THE RIGHT-HAND COLUMN, WHICH HOLDS OUR WORLD LIST */}
                    <Col size="4" id="note-list-col">
                        {/* MAP THROUGH OUR CHARACTERS FROM THE STATE */}
                        {this.state.notes.map(note => {

                            // CREATE CHARACTER CARD WITH ATTRIBUTES
                            return <WorldCardEdit 
                                id={note.id} 
                                title={note.title} 
                                key={note.id} 
                                onClick={this.handleClick}
                            />
                        })}

                        {/* LINK TO ADD A WORLD ITEM, WHICH WILL BRING UP A MODAL */}
                        <AddAnItem 
                            id="add-note-prompt"
                            target="#add-note-modal"
                        > Add a Note </AddAnItem>
                    </Col>
                </Row>

                {/* MODAL FOR ADDING A NEW WORLD ITEM */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="add-note-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* MODAL TITLE */}
                                <h5 className="modal-title">Add a Note</h5>
                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="add-title-input" className="label-title">Title of Note</label>
                                    <FormFieldInput id="add-title-input"  name="title"/>
                                </div>
                            </div>
                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">
                                {/* CLOSE THE MODAL */}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <button type="button" className="btn btn-save-modal" id="add-new-note" onClick={this.addNewNote} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotePage;