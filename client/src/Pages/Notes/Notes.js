import React, {Component} from "react";
import "./Notes.css";
import {Row, Col} from "../../Components/Grid";
import WorldCardEdit from "../../Components/WorldCardEdit";
import TinyMceEditor from "../../Components/TinyMceEditor";
import AddAnItem from "../../Components/AddAnItem";
import {FormFieldInput} from "../../Components/Form";
import API from "../../utils/API";
import Modal from "../../Components/Modal";
import EditorRow from "../../Components/EditorRow";

// CREATE STATEFUL COMPONENT
class NotePage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            notes: [],
            editor: "",
            note_select: "",
            title: ""
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);

        // BIND FOR ADD NEW NOTE CLICK
        this.addNewNote = this.addNewNote.bind(this);
    }

//************** AS SOON AS THE APP LOADS
    componentDidMount() {

        // CALL THE FUNCTION TO UPDATE THE NOTE LIST
        this.updateNoteList()
        .then(data => {

            // WE ALSO HAVE TO UPDATE THE EDITOR AND TITLE STATE SO THAT THE EDITING COMPONENTS ARE POPULATED 
            this.setState({editor: data[0].note_text, title: data[0].title, note_select: data[0].id});

            // SET THE FIRST NOTE CARD TO ACTIVE SINCE THAT'S WHAT SHOWS FIRST
            this.changeClass(data[0].id, "active-world");
        }) 
    }

// ************ FUNCTION THAT CALLS THE API AND UPDATES THE STATE OF THE NOTE LIST
    updateNoteList = () => {

        // THIS FUNCTION WILL RETURN A PROMISE
        return new Promise((resolve, reject) => {

            // GRAB STORY ID FROM LOCAL STORAGE
            let storyId = localStorage.getItem("currentStoryId");                                                

            // PING THE DATABASE TO GET AN UPDATED NOTE LIST
            API.getAll("notes", storyId)
            .then(res => {

                // IF THERE'S AN ERROR, IT MEANS THE USER ISN'T AUTHENTICATED
                if (res.data.error) {

                    // SEND THEM TO THE LOGIN PAGE
                    window.location.href="/login"
                }

                // IF THERE'S NO ERRORS, THEN PROCEED
                else {

                    // PULL OUT THE NOTE DATA
                    let data = res.data;

                    // IF WE ARE GETTING DATA FROM THE SERVER
                    if (data.length > 0) {

                        // DECODE THE DATA COMING IN
                        this.decode(data);

                        console.log("updating state")
                        // UPDATE THE STATE WITH NEW NOTE DATA
                        this.setState({notes: data});

                        // RESOLVE THE PROMISE BECAUSE THINGS WORKED! SEND THE DATA BACK IN CASE WE NEED IT
                        resolve(data);
                    }

                    // IF WE AREN'T GETTING DATA FROM THE SERVER, THE USER NEEDS TO ADD A NOTE
                    else {

                        console.log("updating state")
                        // UPDATE THE STATE WITH THE CURRENT DATA
                        this.setState({notes: data});

                        // CALL THE FUNCTION TO FORCE USER TO ADD A NOTE
                        this.forceAddNote();

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

        // FRONT END VALIDATION FOR THE NOTE TEXT -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY TO THE USER
        data.forEach(note => {
            note.title = decodeURIComponent(note.title)

            // IF THE NOTE TEXT IS NOT EMPTY
            if (note.note_text !== null) {

                // THEN GO AHEAD AND DECODE IT
                note.note_text = decodeURIComponent(note.note_text);
            }

            // IF IT IS EMPTY
            else {

                // REPLACE WITH AN EMPTY STRING SO IT DOESN'T RENDER "NULL"
                note.note_text = ""
            }
        })

        // RETURN FOR REST OF FUNCTION TO USE
        return data;
    }

// *************** FUNCTION TO FORCE THE USER TO ADD A NOTE
    forceAddNote = () => {

        // ALL OF THESE CHANGES WILL FORCE THE USER TO ADD A NOTE IF THE ARRAY IS EMPTY

        // DISABLE USER ABILITY TO CLICK AWAY FROM MODAL
        document.getElementById("add-note-modal").setAttribute("data-backdrop","static");

        // DISABLE MODAL CLOSE WITH THE ESCAPE KEY
        document.getElementById("add-note-modal").setAttribute("data-keyboard","false");

        // SIMULATE A CLICK ON THE ADD NOTE PROMPT
        document.getElementById("add-note-prompt").click();

        // CHANGE THE MODAL TITLE TO BE A LITTLE FRIENDLIER FOR A FIRST TIME USER
        document.getElementById("modal-title").innerHTML = "Add a new note!";

        // REMOVE THE X BUTTON
        document.getElementById("x-button").style.display = "none";

        // REMOVE THE CLOSE BUTTON
        document.getElementById("close-button").style.display = "none";
    }

// ************** FUNCTION TO CHANGE THE CLASS OF THE CARDS
    changeClass(id, active) {

        // PASS IN THE ACTIVE CLASS TO THE CARD
        document.getElementById(id).setAttribute("class", `card rounded-0 ${active}`);
    }

// ************* FUNCTION TO HANDLE WHEN USER CLICKS ON EDIT FOR ANY NOTE ITEM
    handleClick(e) {
       
        // SET THE DATABASE ID OF THE NOTE
        let id = e.target.id;

        // CALL UPDATE EDITOR FUNCTION
        this.updateEditor(id);
    }

// ************** FUNCTION TO UPDATE THE EDITOR
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

                // IF THE NOTE TEXT IS NOT EMPTY
                if (note.note_text !== null) {

                    // ASSIGN THAT TEXT TO THE NEW NOTE VARIABLE
                    newNoteText = note.note_text;
                }

                // IF THE NOTE TEXT IS EMPTY
                else {

                    // SET IT TO AN EMPTY STRING SO IT DOESN'T RENDER "NULL"
                    newNoteText = "";
                }
                
                // CHANGE CLASS OF THAT CARD TO ACTIVE
                this.changeClass(note.id, "active-world");
            }

            // IF THE ID DOESN'T MATCH
            else {

                // REMOVE ACTIVE CLASS
                this.changeClass(note.id);
            }
        })

        // SET THE STATE TO THE ID, AND THEN SET THE TITLE 
        this.setState({note_select: id, title: newNoteTitle});

        // SELECT THE IFRAME THAT HOLDS THE EDITOR AND REPLACE IT WITH THE NEW NOTE TEXT
        window.frames['text-editor-note_ifr'].contentDocument.getElementById('tinymce').innerHTML = newNoteText;
    }

// ************** FUNCTION TO HANDLE WHEN THE NOTE NAME IS UPDATED
    handleInputChange = (e) => {

        // THIS WILL BE THE COLUMN NAME, SO WE ARE PULLING OUT THE NAME ATTRIBUTE OF THE INPUT FIELD
        let name = e.target.name;

        // THIS WILL BE THE NEW VALUE FOR THE COLUMN, SO WE ARE PULLING OUT THE VALUE ATTRIBUTE OF THE INPUT FIELD
        let value = e.target.value;

        // UPDATE THE STATE -- WHATEVER THE COLUMN NAME IS AND ITS NEW VALUE
        this.setState({[name]: value});

        // PING THE DATABASE TO UPDATE THE NOTE
        API.updateOne("notes", this.state.note_select, name, value)
        .then(res => {

            // PING THE DATABASE TO GET AN UPDATED NOTE LIST
            this.updateNoteList();
        })
        .catch(err => {
            // @TODO
            console.log(err);
            alert("Can't save empty title!");
        }) 
    }

// ********** EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
 
        //API POST CALL TO THE SERVER 
        API.updateOne("notes", this.state.note_select, "note_text", e.target.getContent())
        .then(res => {

            //API CALL TO SERVER TO GET UPDATED NOTE LIST
            this.updateNoteList();
        })
    }

// ********** FUNCTION TO HANDLE WHEN THE USER SAVES A NEW WORLD ITEM
    addNewNote = () => {

        // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST NOTE, WE NEED TO FIX THE STUFF WE BROKE TO FORCE THEM TO ADD A NOTE

            // ALLOW THE USER TO CLICK AWAY FROM THE MODAL
            document.getElementById("add-note-modal").setAttribute("data-backdrop","true");

            // ALLOW THE USER TO USE THE ESC KEY TO CLOSE IT
            document.getElementById("add-note-modal").setAttribute("data-keyboard","true");

            // SET MODAL TITLE BACK TO NORMAL
            document.getElementById("modal-title").innerHTML = "Add a note";

            // SHOW THE X BUTTON
            document.getElementById("x-button").style.display = "inline";

            // SHOW THE CLOSE BUTTON
            document.getElementById("close-button").style.display = "inline";

        // GRAB STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        // PULL OUT THE NOTE TITLE FROM THE FORM
        let title = document.getElementById("add-title-input").value.trim();
        
        // PING THE DATABASE TO ADD A NEW NOTE
        API.addNewNote(title, storyId)
        .then(newNoteRes => {
            
            // EMPTY THE MODAL
            document.getElementById("add-title-input").value = "";

            // PING THE DATABASE TO GET AN UPDATED NOTE LIST
            this.updateNoteList()
            .then(res => {

                // UPDATE THE EDITOR WITH NEW NOTE DATA
                this.updateEditor(newNoteRes.data.id)
            })
        })
        .catch(err => {
            console.log(err);
            // @TODO
            alert("Can't save empty note title!");
        })
    }

// ************ FUNCTION TO DELETE A NOTES ITEM FROM THE DB
    deleteNote = () => {

        // GRAB ID OF NOTE FROM STATE
        let id = this.state.note_select;

        // PING API TO DELETE A NOTE
        API.deleteOne("notes", id)
        .then(res => {

            // PING THE DATABASE TO GET AN UPDATED NOTE LIST
            this.updateNoteList()
            .then(res => {

                // PULL THE ID OF THE FIRST ITEM IN THE NOTES ARRAY SO WE CAN SEND IT TO THE UPDATE EDITOR FUNCTION
                let newSelectId = this.state.notes[0].id;

                // UPDATE THE EDITOR
                console.log("updating editor")
                this.updateEditor(newSelectId);
            });
        })
    }

// *************** RENDER THINGS TO THE PAGE
    render() {
        return (

            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div id="note-edit">

                <Row id="editor-note-row">
                    <Col size="8"  p="pr-0" id="editor-note-col">
                        <EditorRow
                            mainFormLabel="Title"
                            placeholder={this.state.title}
                            onChange={this.handleInputChange}
                            onDelete={this.deleteNote}
                            formName="title"
                        />
                        
                        <TinyMceEditor
                            editorText={this.state.editor}
                            onChange={this.handleEditorChange}
                        />
                    </Col>

                    {/* THE RIGHT-HAND COLUMN, WHICH HOLDS OUR NOTE LIST */}
                    <Col size="4" p="pl-0 pr-0" m="mr-0" id="note-list-col">

                        {/* MAP THROUGH OUR NOTES FROM THE STATE */}
                        {this.state.notes.map(note => {

                            // CREATE NOTE CARD WITH ATTRIBUTES
                            return <WorldCardEdit 
                                id={note.id} 
                                title={note.title} 
                                key={note.id} 
                                onClick={this.handleClick}
                            />
                        })}

                        {/* LINK TO ADD A NOTE ITEM, WHICH WILL BRING UP A MODAL */}
                        <AddAnItem 
                            id="add-note-prompt"
                            target="#add-note-modal"
                        > Add a Note </AddAnItem>
                    </Col>
                </Row>

                {/* MODAL FOR ADDING A NEW NOTE ITEM */}
                <Modal
                    id="add-note-modal"
                    modalTitle="Add a Note"
                    saveId="add-new-note" 
                    onClick={this.addNewNote}
                >
                    {/* FORM FIELD TO ADD A NAME */}
                    <div className="form-group">
                        <label htmlFor="add-title-input" className="label-title">Title of Note</label>
                        <FormFieldInput id="add-title-input" name="title"/>
                    </div>
                </Modal>
                
            </div>
        )
    }
}

export default NotePage;