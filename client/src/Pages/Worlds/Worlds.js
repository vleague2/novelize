import React, {Component} from "react";
import "./Worlds.css";
import {Row, Col} from "../../Components/Grid";
import WorldCardEdit from "../../Components/WorldCardEdit";
import TinyMceEditor from '../../Components/TinyMceEditor';
import AddAnItem from "../../Components/AddAnItem";
import {FormFieldInput} from "../../Components/Form";
import API from "../../utils/API";
import Modal from "../../Components/Modal";
import EditorRow from "../../Components/EditorRow";

// CREATE A STATEFUL COMPONENT
class WorldPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            worlds: [],
            editor: "",
            world_select: "",
            title: ""
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);

        // BIND FOR ADD NEW WORLD CLICK
        this.addNewWorld = this.addNewWorld.bind(this);
    }

// *************** AS SOON AS THE APP LOADS
    componentDidMount() {

        // CALL THE FUNCTION TO UPDATE THE NOTE LIST
        this.updateWorldList()
        .then(data => {

            // WE ALSO HAVE TO UPDATE THE EDITOR AND TITLE STATE AND CURRENT SELECT SO THAT THE EDITING COMPONENTS ARE POPULATED 
            this.setState({editor: data[0].world_text, title: data[0].title, world_select: data[0].id});

            // SET THE FIRST WORLD CARD TO ACTIVE SINCE THAT'S WHAT SHOWS FIRST
            this.changeClass(data[0].id, "active-world");
        })
    }

// ********** FUNCTION THAT CALLS THE API AND UPDATES THE STATE
    updateWorldList = () => {

        // THIS FUNCTION WILL RETURN A PROMISE
        return new Promise((resolve, reject) => {

            // GRAB STORY ID FROM LOCAL STORAGE
            let storyId = localStorage.getItem("currentStoryId");

            // PING THE DATABASE TO GET AN UPDATED WORLD LIST
            API.getAll("worldbuilds", storyId)
            .then(res => {

                // IF THERE'S AN ERROR, IT MEANS THE USER ISN'T AUTHENTICATED
                if (res.data.error) {

                    // SEND THEM TO THE LOGIN PAGE
                    window.location.href="/login"
                }

                // IF THERE'S NO ERRORS, THEN PROCEED
                else {
                    // PULL OUT THE WORLD DATA
                    let data = res.data;

                    // IF WE ARE GETTING DATA FROM THE SERVER
                    if (data.length > 0) {

                        // DECODE THE DATA
                        this.decode(data);

                        // UPDATE THE STATE WITH NEW WORLD DATA
                        this.setState({worlds: data});

                        // RESOLVE THE PROMISE BECAUSE THINGS WORKED! SEND THE DATA BACK IN CASE WE NEED IT
                        resolve(data);
                    }

                    // IF WE AREN'T GETTING DATA FROM THE SERVER, THE USER NEEDS TO ADD A WORLD
                    else {
                        // CALL THE FUNCTION TO FORCE USER TO ADD A WORLD
                        this.forceAddWorld();

                        // UPDATE THE STATE WITH THE CURRENT DATA
                        this.setState({worlds: data});

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
        data.forEach(world => {
            world.title = decodeURIComponent(world.title)

            // IF THE NOTE TEXT IS NOT EMPTY
            if (world.world_text !== null) {

                // THEN GO AHEAD AND DECODE IT
                world.world_text = decodeURIComponent(world.world_text);
            }

            // IF IT IS EMPTY
            else {

                // REPLACE WITH AN EMPTY STRING SO IT DOESN'T RENDER "NULL"
                world.world_text = ""
            }
        })

        // RETURN FOR REST OF FUNCTION TO USE
        return data;
    }

// *************** FUNCTION TO FORCE THE USER TO ADD A WORLD
    forceAddWorld = () => {

        // ALL OF THESE CHANGES WILL FORCE THE USER TO ADD A WORLD ELEMENT IF THE ARRAY IS EMPTY

        // DISABLE USER ABILITY TO CLICK AWAY FROM MODAL
        document.getElementById("add-world-modal").setAttribute("data-backdrop","static");

        // DISABLE MODAL CLOSE WITH THE ESCAPE KEY
        document.getElementById("add-world-modal").setAttribute("data-keyboard","false");

        // SIMULATE A CLICK ON THE ADD NOTE PROMPT
        document.getElementById("add-world-prompt").click();

        // CHANGE THE MODAL TITLE TO BE A LITTLE FRIENDLIER FOR A FIRST TIME USER
        document.getElementById("modal-title").innerHTML = "Add a new worldbuilding element!";

        // REMOVE THE X BUTTON
        document.getElementById("x-button").style.display = "none";

        // REMOVE THE CLOSE BUTTON
        document.getElementById("close-button").style.display = "none";
    }


// ************* FUNCTION TO CHANGE THE CLASS OF THE CARDS
    changeClass(id, active) {

        // PASS IN THE ACTIVE CLASS TO THE CARD
        document.getElementById(id).setAttribute("class", `card rounded-0 ${active}`);
    }

// ************ FUNCTION TO HANDLE WHEN USER CLICKS ON EDIT FOR ANY WORLD ITEM
    handleClick(e) {
       
        // SET THE DATABASE ID OF THE WORLD
        let id = e.target.id;

        // UPDATE THE EDITOR
        this.updateEditor(id);
    }

// ********** FUNCTION TO UPDATE THE EDITOR
    updateEditor = (id) => {

        // INIT NEW WORLD VALUES
        let newWorldTitle = "";
        let newWorldText = "";

        // LOOP THROUGH WORLDS 
        this.state.worlds.forEach(world => {

            // IF THE WORLD ID MATCHES THE SELECTED ID
            if (world.id == id) {

                // PULL OUT VALUE AND REASSIGN TO WORLD VALUE
                newWorldTitle = world.title;
                newWorldText = world.world_text;

                // CHANGE CLASS OF THAT CARD TO ACTIVE
                this.changeClass(world.id, "active-world");
            }

            // IF NOT
            else {
                // REMOVE ACTIVE CLASS
                this.changeClass(world.id);
            }
        })

        // SET THE STATE TO THE DATABASE ID BECAUSE WE WILL SEND IT TO THE DB LATER, AND THEN SET THE NAME AND PREVIEW
        this.setState({world_select: id, title: newWorldTitle});

        // SELECT THE IFRAME THAT HOLDS THE EDITOR AND REPLACE IT WITH THE NEW WORLD TEXT
        window.frames['text-editor-world_ifr'].contentDocument.getElementById('tinymce').innerHTML = newWorldText;
    }

// *********** FUNCTION TO HANDLE WHEN THE WORLD NAME IS UPDATED
    handleInputChange = (e) => {
        // THIS WILL BE THE COLUMN NAME, SO WE ARE PULLING OUT THE NAME ATTRIBUTE OF THE INPUT FIELD
        let name = e.target.name;

        // THIS WILL BE THE NEW VALUE FOR THE COLUMN, SO WE ARE PULLING OUT THE VALUE ATTRIBUTE OF THE INPUT FIELD
        let value = e.target.value;

        // UPDATE THE STATE -- WHATEVER THE COLUMN NAME IS AND ITS NEW VALUE
        this.setState({[name]: value});

        // PING THE DATABASE TO UPDATE THE WORLD ITEM, AND CONCATENATE THE ID OF THE SELECTED WORLD ITEM
        API.updateOne("worlds", this.state.world_select, name, value)
        .then(res => {

            // PING THE DATABASE TO GET AN UPDATED WORLD LIST
            this.updateWorldList();
        }) 
        .catch(err => {
            console.log(err);
            // @TODO
            alert("Can't save empty title!");
        })
    }

//*********** EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
        
        //API POST CALL TO THE SERVER 
        API.updateOne("worlds", this.state.world_select, "world_text", e.target.getContent())
        .then(res => {

            //API CALL TO SERVER TO GET WORLD LIST
            this.updateWorldList();
        })
    }

//************* FUNCTION TO HANDLE WHEN THE USER SAVES A NEW WORLD ITEM
    addNewWorld = () => {

        // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST WORLD ITEM, WE NEED TO FIX THE STUFF WE BROKE TO FORCE THEM TO ADD A WORLD ITEM
            // ALLOW THE USER TO CLICK AWAY FROM THE MODAL
            document.getElementById("add-world-modal").setAttribute("data-backdrop","true");

            // ALLOW THE USER TO USE THE ESC KEY TO CLOSE IT
            document.getElementById("add-world-modal").setAttribute("data-keyboard","true");

            // SET MODAL TITLE BACK TO NORMAL
            document.getElementById("modal-title").innerHTML = "Add a worldbuilding element";

            // SHOW THE X BUTTON
            document.getElementById("x-button").style.display = "inline";

            // SHOW THE CLOSE BUTTON
            document.getElementById("close-button").style.display = "inline";

        // GRAB STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        // PULL OUT THE WORLD TITLE FROM THE FORM
        let title = document.getElementById("add-title-input").value.trim();
        
        // PING THE DATABASE TO ADD A NEW WORLD
        API.addNewWorld(title, storyId)
        .then(newWorldRes => {

            // EMPTY MODAL
            document.getElementById("add-title-input").value = "";

            // PING THE DATABASE TO GET AN UPDATED NOTE LIST
            this.updateWorldList()
            .then(res => {

                // UPDATE THE EDITOR WITH NEW WORLD DATA
                this.updateEditor(newWorldRes.data.id)
            })
        })
        .catch(err => {
            console.log(err);
            // @TODO
            alert("Can't save empty title!");
        })
    }
    
// *********** FUNCTION TO DELETE A WORLD ITEM FROM THE DB
    deleteWorld = () => {

        // GRAB ID OF WORLD FROM STATE
        let id = this.state.world_select;

        // PING API TO DELETE A WORLD
        API.deleteOne("worlds", id)
        .then(res => {

            // PING THE DATABASE TO GET AN UPDATED WORLD LIST
            this.updateWorldList()
            .then(res => {

                // PULL THE ID OF THE FIRST ITEM IN THE WORLD ARRAY SO WE CAN SEND IT TO THE UPDATE EDITOR FUNCTION
                let newSelectId = this.state.worlds[0].id;

                // UPDATE THE EDITOR
                this.updateEditor(newSelectId);
            })           
        })
    }

// ************* RENDER THINGS TO THE PAGE
    render() {
        return (
            <div id="world-edit">
                <Row id="editor-world-row">
                    <Col size="8" p="pr-0" id="editor-world-col">
                        <EditorRow
                            mainFormLabel="Title"
                            formValue={this.state.title}
                            onChange={this.handleInputChange}
                            onDelete={this.deleteWorld}
                            formName="title"
                        />

                        <TinyMceEditor
                            editorText={this.state.editor}
                            onChange={this.handleEditorChange}
                        />
                    </Col>

                    {/* THE RIGHT-HAND COLUMN, WHICH HOLDS OUR WORLD LIST */}
                    <Col size="4" p="pl-0 pr-0 mr-0" id="world-list-col">

                        {/* MAP THROUGH OUR WORLD ITEMS FROM THE STATE */}
                        {this.state.worlds.map(world => {

                            // CREATE WORLD CARD WITH ATTRIBUTES
                            return <WorldCardEdit 
                                id={world.id} 
                                title={world.title} 
                                key={world.id} 
                                onClick={this.handleClick}
                            />
                        })}

                        {/* LINK TO ADD A WORLD ITEM, WHICH WILL BRING UP A MODAL */}
                        <AddAnItem 
                            id="add-world-prompt"
                            target="#add-world-modal"
                        > Add a WorldBuilding Item </AddAnItem>
                    </Col>
                </Row>

                {/* MODAL FOR ADDING A NEW WORLD ITEM */}
                <Modal 
                    id="add-world-modal"
                    modalTitle="Add a Worldbuilding Item"
                    saveId="add-new-world" 
                    onClick={this.addNewWorld}
                >
                    {/* FORM FIELD TO ADD A NAME */}
                    <div className="form-group">
                        <label htmlFor="add-title-input" className="label-title" >Title of Worldbuilding Item</label>
                        <FormFieldInput id="add-title-input" name="title" placeholder="i.e. setting"/>
                    </div>
                </Modal>
                
            </div>
        )
    }
}

export default WorldPage;