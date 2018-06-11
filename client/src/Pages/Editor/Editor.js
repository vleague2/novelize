import React, {Component} from "react";
import "./Editor.css";
import {Row, Col} from "../../Components/Grid";
import CharacterCard from "../../Components/CharacterCard";
import WorldCard from "../../Components/WorldCards";
import NoteCard from "../../Components/NoteCards";
import PlotCard from "../../Components/PlotCards";
import { Editor } from '@tinymce/tinymce-react';
import API from "../../utils/API";


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

    // AS SOON AS PAGE LOADS
    componentDidMount() {

        let storyId = localStorage.getItem("currentStoryId");

        //API CALL TO SERVER TO GET CHARACTER LIST
        API.getAll("characters", storyId)
        .then(res => {

            if (res.data.error) {
                window.location.href = "/login";
            }

            else {
                //PULL ARRAY FROM SERVER RESPONSE
                let data = res.data;

                // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
                data.forEach(character => {
                    character.name = decodeURIComponent(character.name)
                     // IF THE TEXT ISN'T NULL
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

                console.log(this.state.characters);
            }
        });

        //API CALL TO SERVER TO GET STORY FOR INITIAL VALUE OF EDITOR
        API.getOne("story", storyId)
        .then(res => {
            let story;
            
            //PULL STORY FROM SERVER RESPONSE
            if (res.data.story_text == null) {
                story = "";
            }
            else {
                story = res.data.story_text;
            }   

            let select_story = res.data.id;

            // FRONT END VALIDATION TO PULL OUT STORY
            let decodedStory = decodeURIComponent(story);          

            //UPDATE STATE WITH STORY TEXT
            this.setState({story: decodedStory, select_story: select_story})
        })

        // API CALL TO GET THE WORLDBUILD INFO
        API.getAll("worldbuilds", storyId)
        .then(res => {
            // PULL DATA FROM SERVER RESPONSE
            let data = res.data;

            // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
            data.forEach(world => {
                world.title = decodeURIComponent(world.title)
                 // IF THE TEXT ISN'T NULL
                 if (world.world_text !== null) {
                    // THEN GO AHEAD AND DECODE IT
                    world.world_text = decodeURIComponent(world.world_text);
                }
                // OTHERWISE JUST SET IT TO EMPTY
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

            // FRONT END VALIDATION FOR THE NOTE TEXT -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
            data.forEach(note => {
                note.title = decodeURIComponent(note.title)
                // IF THE TEXT ISN'T NULL
                if (note.note_text !== null) {
                    // THEN GO AHEAD AND DECODE IT
                    note.note_text = decodeURIComponent(note.note_text);
                }
                // OTHERWISE JUST SET IT TO EMPTY
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

            // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
            data.forEach(plot => {
                plot.title = decodeURIComponent(plot.title)
                // IF THE TEXT ISN'T NULL
                if (plot.plot_text !== null) {
                    // THEN GO AHEAD AND DECODE IT
                    plot.plot_text = decodeURIComponent(plot.plot_text);
                }
                // OTHERWISE JUST SET IT TO EMPTY
                else {
                    plot.plot_text = "";
                }
            })

            // UPDATE STATE WITH PLOT DATA
            this.setState({plots: data});
        })
    }

    //HANDLE CLICKS FOR TABS
    handleClick(e) {

        //PULL ID OF CLICKED TAB
        let tab = e.target.id;

        //DECIDE WHAT TO DO BASED ON WHAT ID IT IS
        switch (tab) {
            //IF IT'S CHARACTER TAB
            case "char-tab": 
                //UPDATE COLORS OF CHARACTER TAB
                document.getElementById("char-tab").style.backgroundColor = "#343a40";
                document.getElementById("char-tab").style.color = "#f8f9fa";
                //UPDATE COLORS OF PLOT TAB
                document.getElementById("plot-tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("plot-tab").style.color = "#343a40";
                // UPDATE STATE
                this.setState({leftTab: "char-tab"});
                break;
            //IF IT'S PLOT TAB
            case "plot-tab":
                // UPDATE COLORS OF CHARACTER TAB
                document.getElementById("char-tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("char-tab").style.color = "#343a40";
                //UPDATE COLORS OF PLOT TAB
                document.getElementById("plot-tab").style.backgroundColor = "#343a40";
                document.getElementById("plot-tab").style.color = "#f8f9fa";
                // UPDATE STATE
                this.setState({leftTab: "plot-tab"});
                break;
            case "world-tab":
                // UPDATE COLORS OF WORLD TAB
                document.getElementById("world-tab").style.backgroundColor = "#343a40";
                document.getElementById("world-tab").style.color = "#f8f9fa";
                //UPDATE COLORS OF NOTES TAB
                document.getElementById("notes-tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("notes-tab").style.color = "#343a40";
                // UPDATE STATE
                this.setState({rightTab: "world-tab"});
                break;
            case "notes-tab":
             // UPDATE COLORS OF WORLD TAB
                document.getElementById("world-tab").style.backgroundColor = "#f8f9fa";
                document.getElementById("world-tab").style.color = "#343a40";;
                //UPDATE COLORS OF NOTES TAB
                document.getElementById("notes-tab").style.backgroundColor = "#343a40";;
                document.getElementById("notes-tab").style.color = "#f8f9fa";
                // UPDATE STATE
                this.setState({rightTab: "notes-tab"});
                break;
            //IF IT'S NONe OF THOSE
            default:
                //THEN THINGS ARE DEFINITELY BROKEN
                console.log("RIP Me");
        }
    }

    //EVERY TIME THE VALUE OF THE EDITOR CHANGES SO WE CAN AUTOSAVE
    handleEditorChange = (e) => {
       
        //API POST CALL TO THE SERVER
        API.updateOne("story", this.state.select_story, "story_text", e.target.getContent())
        .then(res => {
            // CONSOLE LOG THAT WE'RE SAVING BECAUSE WE DON'T ACTUALLY HAVE TO DO ANYTHING ELSE
            console.log("Saved!");
        })
    }

    // CODE TO RUN WHEN WE WANT TO RENDER THE CHARACTER SIDEBAR
    CharTab = () => {
        if (this.state.characters.length < 1 ) {
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding characters.</h6>
        }

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

    // CODE TO RUN WHEN WE WANT TO RENDER THE PLOT SIDEBAR
    PlotTab = () => {
        if (this.state.plots.length < 1 ) {
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding plot points to your story.</h6>
        }

        else {

            return this.state.plots.map(plot => {

                // CREATE PLOT CARDS WITH ATTRIBUTES
                return <PlotCard
                        id={plot.id}
                        key={plot.id}
                        title={plot.title}>
                        {plot.plot_text}
                        </PlotCard>
            })
        }
    }

    // CODE TO RUN WHEN WE WANT TO RENDER THE WORLD SIDEBAR
    WorldTab = () => {
        if (this.state.worldbuilds.length < 1 ) {
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding worldbuilding elements to your story.</h6>
        }

        else {

            // MAP THROUGH EACH OF THE WORLDS IN THE STATE
            return this.state.worldbuilds.map(world => {

                // CREATE WORLD CARD WITH ATTRIBUTES
                return <WorldCard 
                    id={world.id} 
                    title={world.title} 
                    descr={world.world_text} 
                    key={world.id} 
                />
            })
        }
    }

    // CODE TO RUN WHEN WE WANT TO RENDER THE NOTES SIDEBAR
    NoteTab = () => {
        if (this.state.notes.length < 1 ) {
            return <h6 className="nothing-yet"> There's nothing here yet! Click the link above to start adding notes for yourself.</h6>
        }

        else {
            // MAP THROUGH EACH OF THE WORLDS IN THE STATE
            return this.state.notes.map(note => {
    
                // CREATE WORLD CARD WITH ATTRIBUTES
                return <NoteCard 
                    id={note.id} 
                    title={note.title} 
                    text={note.note_text} 
                    key={note.id} 
                />
            })
        }
    }

    // CONDITIONAL RENDER FOR THE LEFT SIDEBAR
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

    // CONDITIONAL RENDER FOR THE RIGHT SIDEBAR
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

    render() {
        return (
            // CONTAINER DIV BECAUSE REACT ONLY LETS YOU EXPORT ONE DIV
            <div>
                {/* THIS ROW HOLDS OUR ENTIRE PAGE, BASICALLY */}
                <Row id="editor-row">
                    {/* SETTING UP OUR 3-COL SYSTEM. THIS IS THE LEFT COL FOR LEFT TABS*/}
                    <Col size="3" id="tabs-left">
                        {/* TABS FOR CHARACTERS AND PLOT */}
                        <button className="btn rounded-0 tab-btn" id="char-tab" onClick={this.handleClick}>
                            Characters
                        </button>
                        <button className="btn rounded-0 tab-btn" id="plot-tab" onClick={this.handleClick}>
                            Plot
                        </button>
            
                        {/* DIV TO HOLD THE SIDEBAR CONTENT */}
                        <div>
                            {/* P CLASS TO HOLD THE LINK BECAUSE IT WOULDN'T CENTER UGH */}
                            <p className="justify-content-center text-center mt-2 mb-2">
                                {/* LINK TO EDIT IN FULLSCREEN WITH A TERNARY TO DETERMINE WHAT PAGE TO LINK TO */}
                                <a href={this.state.leftTab === "char-tab" ? "/character-edit" : "/plot-edit"} className="edit-fullscreen">Edit or add to list <i className="fas fa-angle-right" ></i></a>
                            </p>

                            {/* CONDITIONAL RENDER FOR THE LEFT SIDEBAR */}
                            <this.LeftTabRender/>
                        </div>    
                    </Col>

                    {/* CENTER COLUMN FOR THE TEXT EDITOR */}
                    <Col size="6" id="editor-col">

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
                                toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
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
                    <Col size="3" id="tabs-right">
                        {/* TABS FOR WORLD AND NOTES */}
                        <button className="btn rounded-0 tab-btn" id="world-tab" onClick={this.handleClick}>
                            Worldbuild
                        </button>
                        <button className="btn rounded-0 tab-btn" id="notes-tab" onClick={this.handleClick}>
                            Notes
                        </button>

                        {/* DIV TO HOLD THE SIDEBAR CONTENT */}
                        <div>
                            {/* P CLASS TO HOLD THE LINK BECAUSE IT WOULDN'T CENTER UGH */}
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