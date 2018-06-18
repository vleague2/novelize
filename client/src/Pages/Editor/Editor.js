import React, {Component} from "react";
import "./Editor.css";
import {Row, Col} from "../../Components/Grid";
import Button from "../../Components/Button";
import CharacterCard from "../../Components/CharacterCard";
import WorldCard from "../../Components/WorldCards";
import NoteCard from "../../Components/NoteCards";
import PlotCard from "../../Components/PlotCards";
import { Editor } from '@tinymce/tinymce-react';
import API from "../../utils/API";

// CREATE STATEFUL COMPONENT
class EditorPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            characters: [],
            select_story: "",
            story: "",
            worldbuilds: [],
            notes: [],
            plots: [],
            leftTab: "char-tab",
            rightTab: "world-tab"
        }

        // BIND THIS FOR HANDLECLICK
        this.handleClick = this.handleClick.bind(this);
    }

// ***************** AS SOON AS PAGE LOADS
    componentDidMount() {

        // PULL STORYID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        //API CALL TO SERVER TO GET CHARACTER LIST
        API.getAll("characters", storyId)
        .then(res => {

            // IF WE GET AN ERROR IT'S BECAUSE THE USER ISN'T LOGGED IN
            if (res.data.error) {

                //  SO REDIRECT THEM TO LOG IN
                window.location.href = "/login";
            }

            // IF WE DON'T HAVE ANY ERRORS, LET'S CONTINUE
            else {

                //PULL ARRAY FROM SERVER RESPONSE
                let data = res.data;

                // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY for the user
                data.forEach(character => {
                    character.name = decodeURIComponent(character.name)

                     // IF THE character TEXT ISN'T NULL
                     if (character.character_text !== null) {

                        // THEN GO AHEAD AND DECODE IT
                        character.character_text = decodeURIComponent(character.character_text);
                    }

                    // OTHERWISE JUST SET IT TO EMPTY
                    else {
                        character.character_text = "";
                    }
                    character.preview_text = decodeURIComponent(character.preview_text);
                    character.character_image = decodeURIComponent(character.character_image)

                })

                //UPDATE STATE WITH CHARACTER LIST
                this.setState({characters: data});
            }
        });

        //API CALL TO SERVER TO GET STORY FOR INITIAL VALUE OF EDITOR
        API.getOne("story", storyId)
        .then(res => {

            // INITIALIZE STORY VARIABLE
            let story;
            
            //IF WE DON'T HAVE ANY STORY TEXT FROM THE SERVER
            if (res.data.story_text == null) {

                // SET THE VARIABLE TO AN EMPTY STRING TO AVOID RENDERING "NULL" TO THE PAGE
                story = "";
            }

            // IF THERE IS TEXT FROM THE SERVER
            else {

                // SET THE STORY TO THE STORY TEXT
                story = res.data.story_text;
            }   

            // FRONT END VALIDATION TO PULL OUT STORY
            let decodedStory = decodeURIComponent(story);          

            //UPDATE STATE WITH STORY TEXT AND THE ID OF THE SELECTED STORY
            this.setState({story: decodedStory, select_story: res.data.id})
        })

        // API CALL TO GET THE WORLDBUILD INFO
        API.getAll("worldbuilds", storyId)
        .then(res => {

            // PULL DATA FROM SERVER RESPONSE
            let data = res.data;

            // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
            data.forEach(world => {
                world.title = decodeURIComponent(world.title)

                 // IF THE WORLD TEXT ISN'T NULL
                 if (world.world_text !== null) {

                    // THEN GO AHEAD AND DECODE IT
                    world.world_text = decodeURIComponent(world.world_text);
                }
                // OTHERWISE JUST SET IT TO EMPTY SO IT DOESN'T RENDER "NULL"
                else {
                    world.world_text = "";
                }
            })

            // UPDATE STATE WITH WORLDBUILD DATA
            this.setState({worldbuilds: data});
        })

        // API CALL TO GET NOTES
        API.getAll("notes", storyId)
        .then(res => {

            // PULL DATA FROM SERVER RESPONSE
            let data = res.data;

            // FRONT END VALIDATION FOR THE NOTE TEXT -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY FOR THE USER
            data.forEach(note => {
                note.title = decodeURIComponent(note.title)

                // IF THE NOTE TEXT ISN'T NULL
                if (note.note_text !== null) {

                    // THEN GO AHEAD AND DECODE IT
                    note.note_text = decodeURIComponent(note.note_text);
                }

                // OTHERWISE JUST SET IT TO EMPTY SO IT DOESN'T RENDER "NULL"
                else {
                    note.note_text = "";
                }
            })

            // UPDATE STATE WITH NOTES DATA
            this.setState({notes: data});
        })

        // API CALL TO GET PLOTS
        API.getAll("plots", storyId)
        .then(res => {

            // PULL DATA FROM SERVER RESPONSE
            let data = res.data;

            // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY FOR THE USER
            data.forEach(plot => {
                plot.title = decodeURIComponent(plot.title)

                // IF THE PLOT TEXT ISN'T NULL
                if (plot.plot_text !== null) {

                    // THEN GO AHEAD AND DECODE IT
                    plot.plot_text = decodeURIComponent(plot.plot_text);
                }

                // OTHERWISE JUST SET IT TO EMPTY SO IT DOESN'T RENDER "NULL"
                else {
                    plot.plot_text = "";
                }
            })

            // UPDATE STATE WITH PLOT DATA
            this.setState({plots: data});
        })
    }

// **************** UPDATE TAB COLORS
    tabColor = (tab1, tab2) => {
        //UPDATE COLORS OF ACTIVE TAB TO SELECT
        document.getElementById(tab1).style.backgroundColor = "#f8f9fa";
        document.getElementById(tab1).style.color = "#343a40";

        //UPDATE COLORS OF INACTIVE TAB TO UNSELECT
        document.getElementById(tab2).style.backgroundColor = "gray";
        document.getElementById(tab2).style.color = "lightgray";
    }

// ************** HANDLE CLICKS FOR TABS
    handleClick(e) {

        //PULL ID OF CLICKED TAB
        let tab = e.target.id;

        //DECIDE WHAT TO DO BASED ON WHAT ID IT IS
        switch (tab) {

            //IF IT'S CHARACTER TAB
            case "char-tab": 

                // UPDATE TAB COLORS
                this.tabColor("char-tab", "plot-tab");
            
                // UPDATE STATE
                this.setState({leftTab: "char-tab"});
                break;

            //IF IT'S PLOT TAB
            case "plot-tab":

                // UPDATE TAB COLORS
                this.tabColor("plot-tab", "char-tab");
               
                // UPDATE STATE
                this.setState({leftTab: "plot-tab"});
                break;

            // IF IT'S THE WORLD TAB
            case "world-tab":

                // UPDATE TAB COLORS
                this.tabColor("world-tab", "notes-tab");

                // UPDATE STATE
                this.setState({rightTab: "world-tab"});
                break;

            // IF IT'S THE NOTES TAB
            case "notes-tab":

                // UPDATE TAB COLORS
                this.tabColor("notes-tab", "world-tab");

                // UPDATE STATE
                this.setState({rightTab: "notes-tab"});
                break;

            //IF IT'S NONE OF THOSE
            default:

                //THEN THINGS ARE DEFINITELY BROKEN
                console.log("Error!");
        }
    }

// *********** EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
       
        //API POST CALL TO THE SERVER
        API.updateOne("story", this.state.select_story, "story_text", e.target.getContent())
        .then(res => {

            //BECAUSE TINYMCE EDITOR KEEPS TEXT AS IT'S UPDATED, WE DON'T ACTUALLY HAVE TO DO AN API CALL TO RETRIEVE AN STORY. SO NOTHING HAPPENS HERE.
            
        })
    }

// ************ CODE TO RUN WHEN WE WANT TO RENDER THE CHARACTER SIDEBAR
    CharTab = () => {

        // IF WE HAVE NO CHARACTERS IN OUR ARRAY
        if (this.state.characters.length < 1 ) {

            // WE RENDER TEXT GIVING THE USER SOME DIRECTION ON HOW TO CREATE A CHARACTER
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding characters.</h6>
        }

        // IF WE DO HAVE CHARACTERS
        else {
            
            // MAP THROUGH EACH CHARACTER IN THE STATE
            return this.state.characters.map(character => {
    
                // CREATE CHARACTER CARD WITH ATTRIBUTES
                return <CharacterCard 
                    id={character.id} 
                    title={character.name} 
                    preview={character.preview_text} 
                    key={character.id} 
                    image={character.character_image} 
                    profile={character.character_text}
                />
            })
        }
    }

// ***************** CODE TO RUN WHEN WE WANT TO RENDER THE PLOT SIDEBAR
    PlotTab = () => {

        // IF WE HAVE NO PLOT POINTS
        if (this.state.plots.length < 1 ) {

            // RENDER TEXT TELLING THE USER HOW TO ADD A PLOT POINT
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding plot points to your story.</h6>
        }

        // IF WE DO HAVE PLOT POINTS
        else {

            // MAP THROUGH THE PLOTS ARRAY
            return this.state.plots.map(plot => {

                // CREATE A PLOT CARD FOR EACH WITH ATTRIBUTES
                return <PlotCard
                        id={plot.id}
                        key={plot.id}
                        title={plot.title}>
                        {plot.plot_text}
                        </PlotCard>
            })
        }
    }

// ************* CODE TO RUN WHEN WE WANT TO RENDER THE WORLD SIDEBAR
    WorldTab = () => {

        // IF WE DON'T HAVE ANYTHING IN OUR WORLDBUILD ARRAY
        if (this.state.worldbuilds.length < 1 ) {

            // RETURN TEXT TELLING THE USER HOW TO CREATE A WORLD ELEMENT
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding worldbuilding elements to your story.</h6>
        }

        // IF WE DO HAVE WORLDBUILDS
        else {

            // MAP THROUGH EACH OF THE WORLDS IN THE STATE
            return this.state.worldbuilds.map(world => {

                // CREATE WORLD CARD WITH ATTRIBUTES FOR EACH
                return <WorldCard 
                    id={world.id} 
                    title={world.title} 
                    descr={world.world_text} 
                    key={world.id} 
                />
            })
        }
    }

// ************* CODE TO RUN WHEN WE WANT TO RENDER THE NOTES SIDEBAR
    NoteTab = () => {

        // IF WE DON'T HAVE ANY NOTES
        if (this.state.notes.length < 1 ) {

            // RENDER TEXT TELLING THE USER HOW TO ADD A NEW NOTE
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding notes for yourself.</h6>
        }

        // IF WE DO HAVE NOTES
        else {

            // MAP THROUGH EACH OF THE NOTES IN THE STATE
            return this.state.notes.map(note => {
    
                // CREATE NOTE CARD WITH ATTRIBUTES FOR EACH
                return <NoteCard 
                    id={note.id} 
                    title={note.title} 
                    text={note.note_text} 
                    key={note.id} 
                />
            })
        }
    }

// ************* CONDITIONAL RENDER FOR THE LEFT SIDEBAR
    LeftTabRender = () => {

        // IF THE CHARACTER TAB IS SELECTED
        if (this.state.leftTab === "char-tab") {

            // RETURN THE FUNCTION THAT RENDERS OUR CHARACTER CARDS
            return <this.CharTab/>
        }

        // OTHERWISE (AKA IF THE PLOT TAB IS SELECTED)
        else {

            // RETURN THE FUNCTION THAT RENDERS OUR PLOT
            return <this.PlotTab/>
        }
    }

// *********** CONDITIONAL RENDER FOR THE RIGHT SIDEBAR
    RightTabRender = () => {

        // IF THE WORLD TAB IS SELECTED
        if (this.state.rightTab === "world-tab") {

            // RETURN THE FUNCTION THAT RENDERS OUR WORLD CARDS
            return <this.WorldTab/>
        }

        // OTHERWISE (AKA IF THE NOTES TAB IS SELECTED)
        else {

            // RETURN THE FUNCTION THAT RENDERS OUR NOTES
            return <this.NoteTab/>
        }
    }

// ***************** RENDER THINGS TO THE PAGE!!!!!!!
    render() {
        return (
            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div>
                {/* THIS ROW HOLDS OUR ENTIRE PAGE, BASICALLY */}
                <Row id="editor-row">

                    {/* SETTING UP OUR 3-COL SYSTEM. THIS IS THE LEFT COL FOR LEFT TABS*/}
                    <Col size="3" p="pr-0" m="mb-4" id="tabs-left">

                        {/* TABS FOR CHARACTERS AND PLOT, WHICH ARE BUTTONS */}
                        <Button className="tab-btn rounded-0" id="char-tab" onClick={this.handleClick}>
                            Characters
                        </Button>
                        <Button className="rounded-0 tab-btn" id="plot-tab" onClick={this.handleClick}>
                            Plot
                        </Button>
            
                        {/* DIV TO HOLD THE SIDEBAR CONTENT */}
                        <div className="pb-4">

                            {/* P CLASS TO HOLD THE LINK TO CENTER THE TEXT */}
                            <p className="justify-content-center text-center mt-2 mb-2">

                                {/* LINK TO EDIT IN FULLSCREEN WITH A TERNARY TO DETERMINE WHAT PAGE TO LINK TO */}
                                <a href={this.state.leftTab === "char-tab" ? "/character-edit" : "/plot-edit"} className="edit-fullscreen">Edit or add to list <i className="fas fa-angle-right" ></i></a>
                            </p>

                            {/* CONDITIONAL RENDER FOR THE LEFT SIDEBAR */}
                            <this.LeftTabRender/>
                        </div>    
                    </Col>

                    {/* CENTER COLUMN FOR THE TEXT EDITOR */}
                    <Col size="6" p="p-0" id="editor-col">

                        {/*SET UP THE TEXT EDITOR*/}
                        <Editor
                            apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' 
                            cloudChannel='dev'

                            // DROPPING IN THE STATE VALUE TO POPULATE THE EDITOR INITIALLY
                            initialValue={`<p>${this.state.story}</p>`}
                            id="text-editor"
                            
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

                                // HIDE THE MENU BAR FOR FILE STUFF
                                menubar: false,

                                // ADD IN SOME CSS FOR FONTS AND SUCH
                                content_css: [
                                    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                    '//www.tinymce.com/css/codepen.min.css'],

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

                    {/* COLUMN FOR RIGHT SIDEBAR */}
                    <Col size="3" p="pr-0 pl-0" m="mb-4" id="tabs-right">

                        {/* TABS FOR WORLD AND NOTES */}
                        <Button className="rounded-0 tab-btn" id="world-tab" onClick={this.handleClick}>
                            Worldbuild
                        </Button>
                        <Button className="rounded-0 tab-btn" id="notes-tab" onClick={this.handleClick}>
                            Notes
                        </Button>

                        {/* DIV TO HOLD THE SIDEBAR CONTENT */}
                        <div>

                            {/* P CLASS TO HOLD THE LINK TO CENTER THE TEXT */}
                            <p className="justify-content-center text-center mt-2 mb-2">

                                {/* LINK TO EDIT IN FULLSCREEN WITH A TERNARY TO DETERMINE WHAT PAGE TO LINK TO */}
                                <a href={this.state.rightTab === "world-tab" ? "/world-edit" : "/notes-edit"} className="edit-fullscreen">Edit or add to list <i className="fas fa-angle-right"></i></a>
                            </p>

                            {/* CONDITIONAL RENDER FOR THE RIGHT SIDEBAR */}
                            <this.RightTabRender/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditorPage;