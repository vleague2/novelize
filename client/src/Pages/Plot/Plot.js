import React, {Component} from "react";
import "./Plot.css";
import {Row, Col} from "../../Components/Grid";
import BackButton from "../../Components/BackButton";
import TimelineItem from "../../Components/TimelineItem";
import AddAnItem from "../../Components/AddAnItem";
import Button from "../../Components/Button";
import API from "../../utils/API";
import {FormFieldInput} from "../../Components/Form"

// CREATE A STATEFUL COMPONENT
class PlotPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            plots: []
        }

        // BIND THIS FOR HANDLECLICK
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

// *********** FUNCTION TO PING THE API AND UPDATE THE PLOT ARRAY STATE
    updatePlotList = () => {

        // THIS FUNCTION WILL RETURN A PROMISE
        return new Promise((resolve, reject) => {

            // GRAB THE STORY ID FROM LOCAL STORAGE
            let storyId = localStorage.getItem("currentStoryId");

            // CALL THE API TO GET ALL PLOT POINTS FOR THE STORY ID
            API.getAll("plots", storyId)
            .then(res => {

                // IF WE GET ERRORS FROM THE SERVER, THAT MEANS THE USER ISN'T AUTHENTICATED
                if (res.data.error) {

                    // SO SEND THEM TO THE LOGIN PAGE
                    window.location.href = "/login";
                }

                // IF WE HAVE NO ERRORS, PROCEED
                else {
                    // PULL OUT THE RESPONSE DATA
                    let data = res.data;

                    // IF THERE'S DATA COMING BACK FROM SERVER
                    if (data.length > 0) {

                        this.decode(data);  

                        // UPDATE THE STATE WITH THE DATA
                        this.setState({plots: data});

                        // RESOLVE THE PROMISE BECAUSE THINGS WORKED! SEND THE DATA BACK IN CASE WE NEED IT
                        resolve(data);
                    }

                    // IF NOT, THE USER NEEDS TO ADD A PLOT POINT
                    else {

                        // UPDATE THE CURRENT STATE WITH DATA
                        this.setState({plots: data})

                        // FORCE THE USER TO ADD A PLOT
                        this.forceAddPlot();

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

// ************** FUNCTION TO DECODE FROM THE SERVER
    decode = (data) => {

        // FRONT END VALIDATION -- WE ARE DECODING THE TEXT ON THE WAY OUT SO IT RENDERS PROPERLY
        data.forEach(plot => {
            plot.title = decodeURIComponent(plot.title)

            // IF THE PLOT TEXT IS NOT NULL
            if (plot.plot_text !== null) {
                //DECODE IT
                plot.plot_text = decodeURIComponent(plot.plot_text);
            }

            // IF IT IS NULL,
            else {

                // JUST SET IT TO AN EMPTY STRING SO IT DOESN'T RENDER "NULL"
                plot.plot_text = "";
            }   
        })

        // RETURN FOR REST OF FUNCTION TO USE
        return data;
    }

// ************* FUNCTION TO FORCE A USER TO ADD A PLOT POINT
    forceAddPlot = () => {
        // ALL OF THESE CHANGES WILL FORCE THE USER TO ADD A PLOT POINT IF THE ARRAY IS EMPTY

        // DISABLE USER ABILITY TO CLICK AWAY FROM MODAL
        document.getElementById("add-plot-modal").setAttribute("data-backdrop","static");

        // DISABLE MODAL CLOSE WITH THE ESCAPE KEY
        document.getElementById("add-plot-modal").setAttribute("data-keyboard","false");

        // SIMULATE A CLICK ON THE ADD NOTE PROMPT
        document.getElementById("add-plot-prompt").click();

        // CHANGE THE MODAL TITLE TO BE A LITTLE FRIENDLIER FOR A FIRST TIME USER
        document.getElementById("modal-title").innerHTML = "Add a new plot point!";

        // REMOVE THE X BUTTON
        document.getElementById("x-button").style.display = "none";

        // REMOVE THE CLOSE BUTTON
        document.getElementById("close-button").style.display = "none";
    }

// ************* AS SOON AS THE APP LOADS
    componentDidMount() {
        // CALL THE UPDATE PLOT FUNCTION
        this.updatePlotList();
    }

// ************ WHEN THE USER HITS THE DELETE BUTTON ON ANY PLOT POINT
    onDelete = (e) => {

        // GRAB THE ID OF THE BUTTON FROM THE CLICK EVENT
        let id = e.target.id;
    
        // CALL THE API TO DELETE THE PLOT ITEM WITH THE ID
        API.deleteOne("plots", id)
        .then(res => {

            // PING API TO GET AN UDPATED PLOT LIST
           this.updatePlotList()
           .then(data => {

                // LOOP THROUGH PLOTS TO UPDATE EACH POSITION NUMBER SINCE WE JUST DELETED ONE AND THE POSITIONS NEED TO BE NUMERICALLY IN ORDER
                this.state.plots.forEach(plot => {

                    // GRAB THE INDEX OF THE ITEM IN THE ARRAY AND ADD 1 SO WE DON'T START ON 0
                    let newPosition = this.state.plots.indexOf(plot) + 1;
        
                    // PING THE DATABASE TO UPDATE THAT ITEM WITH THE NEW POSITION
                    API.updateOne("plots", plot.id, "position", newPosition)
                    .then(res => {

                        // UPDATE THE PLOT LIST ONE LAST TIME 
                        this.updatePlotList();
                    })
                })
           })
        })
    }

// *************** FUNCTION TO ADD A NEW PLOT POINT
    addNewPlot = () => {

        // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST PLOT POINT, WE NEED TO FIX THE STUFF WE BROKE TO FORCE THEM TO ADD A PLOT POINT

            // ALLOW THE USER TO CLICK AWAY FROM THE MODAL
            document.getElementById("add-plot-modal").setAttribute("data-backdrop","true");

            // ALLOW THE USER TO USE THE ESC KEY TO CLOSE IT
            document.getElementById("add-plot-modal").setAttribute("data-keyboard","true");

            // SET MODAL TITLE BACK TO NORMAL
            document.getElementById("modal-title").innerHTML = "Add a plot point";

            // SHOW THE X BUTTON
            document.getElementById("x-button").style.display = "inline";

            // SHOW THE CLOSE BUTTON
            document.getElementById("close-button").style.display = "inline";

        // GRAB THE TITLE FROM THE INPUT FIELD
        let title = document.getElementById("add-title-input").value.trim();

        // GRAB THE PLOT TEXT FROM THE INPUT FIELD 
        let plot = document.getElementById("add-plot-input").value.trim();

        // THE NEW POSITION WILL BE AFTER THE LAST ITEM'S POSITION, WHICH WE CAN CALCULATE WITH THE LENGTH OF THE ARRAY AND THEN ADD ONE
        let position = this.state.plots.length + 1;

        // GRAB THE STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        // PING API TO ADD A NEW PLOT WITH THE DATA
        API.addNewPlot(title, plot, position, storyId)
        .then(newPlotRes => {

            // EMPTY THE FORM FIELDS
            document.getElementById("add-title-input").value = "";
            document.getElementById("add-plot-input").value = "";

            // UPDATE THE PLOT LIST
            this.updatePlotList();
        })
    }

// ************ WHEN THE USER EDITS A PLOT ITEM, WE NEED TO POPULATE THE MODAL WITH THE CORRECT ITEM'S INFO
    onEdit = (e) => {
        // GRAB THE ID OF THE BUTTON THEY CLICKED
        let id = e.target.id;

        // INITIALIZE VARIABLES FOR PLOT AND PLOT TEXT
        let title;
        let plotText;

        // LOOP THROUGH THE STATE LIST OF PLOTS
        this.state.plots.forEach(plot => {

            // IF THE ID OF THE PLOT ITEM MATCHES THE ID WE PULLED
            if (plot.id == id) {

                // SET THE TITLE AND PLOT TEXT TO THAT ITEM'S INFO
                title = plot.title;
                plotText = plot.plot_text;
            }
        })

        // POPULATE THE TITLE INPUT FIELD WITH THE TITLE VARIABLE
        document.getElementById("update-title-input").value = title;

        // POPULATE THE PLOT INPUT FIELD WITH THE PLOT VARIABLE
        document.getElementById("update-plot-input").value = plotText;

        // SET THE MODAL'S DATA-ID TO THE ID WE PULLED SO WE CAN GRAB IT ON SAVE
        document.getElementById("update-plot-save").setAttribute('data-id', id);
    }

// ************ FUNCTION THAT RUNS WHEN THE USER SAVES THE PLOT INFO THEY'VE EDITED
    updatePlot = () => {

        // GRAB THE DATA ID OF THE MODAL
        let id = document.getElementById("update-plot-save").getAttribute('data-id');

        // GRAB THE TITLE FROM THE FORM INPUT
        let title = document.getElementById("update-title-input").value.trim();

        // GRAB THE PLOT TEXT FROM THE FORM INPUT
        let plotText = document.getElementById("update-plot-input").value.trim();

        // API CALL TO UPDATE ONE ITEM, WITH THE DATA WE GOT. BUT WE HAVE TO DO 2 SEPARATE API CALLS BECAUSE THE API UTIL ONLY UPDATES ONE COLUMN LOL.
        API.updateOne("plots", id, "title", title)
        .then(res => {
            API.updateOne("plots", id, "plot_text", plotText)
            .then(res => {

                // UPDATE THE PLOT LIST
                this.updatePlotList();

                // EMPTY THE FORM VALUES
                document.getElementById("update-title-input").value = "";
                document.getElementById("update-plot-input").value = "";
            })
        })
    }

// RENDER THINGS TO THE PAGE
    render() {
        return (

            // CONTAINER DIV BECAUSE REACT CAN ONLY RETURN ONE CONTAINER
            <div id="entire-page">

                {/* THIS ROW HOLDS THE WHOLE PAGE */}
                <Row id="plot-editor-row">

                    {/* THIS ROW HOLDS THE BACK BUTTON AND THE PROMPT TO ADD A NEW PLOT POINT */}
                    <Row id="back-button-row">

                        {/* COLUMN FOR THE BACK BUTTON */}
                        <Col size="3">

                            {/* AND THERE'S THE BACK BUTTON */}
                            <BackButton />
                        </Col>

                        {/* COLUMN FOR THE ADD A PLOT PROMPT */}
                        <Col size="6">

                            {/* PROMPT TO ADD A PLOT POINT */}
                            <AddAnItem id="add-plot-prompt" target="#add-plot-modal">Add a Plot Point </AddAnItem>
                        </Col>
                    </Row>

                    {/* MAP THROUGH THE PLOT STATE */}
                    {this.state.plots.map(plot => {

                        //  RETURN A TIMELINE ITEM
                        return <TimelineItem 
                                id={plot.id} 
                                key={plot.id}
                                title={plot.title}
                                onDelete={this.onDelete}
                                onEdit = {this.onEdit}
                                target="#update-plot-modal">
                                    {plot.plot_text}
                                </TimelineItem>
                    })}
                </Row>

                {/* MODAL FOR ADDING A NEW PLOT ITEM */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="add-plot-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                {/* MODAL TITLE */}
                                <h5 className="modal-title">Add a Plot Point</h5>

                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <Button className="close" dataDismiss="modal" ariaLabel="Close">
                                    <span aria-hidden="true" id="x-button">&times;</span>
                                </Button>
                            </div>

                            {/* MODAL BODY */}
                            <div className="modal-body">

                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="add-title-input" className="label-title" id="modal-title">Title of Plot Point</label>
                                    <FormFieldInput id="add-title-input" name="title"/>
                                </div>

                                {/* FORM FIELD TO ADD A PLOT POINT */}
                                <div className="form-group">
                                    <label htmlFor="add-plot-input" className="label-title">Plot Point</label>
                                    <textarea className="form-control" id="add-plot-input" rows="5"/>
                                </div>
                            </div>

                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">

                                {/* CLOSE THE MODAL */}
                                <Button className="btn-secondary" dataDismiss="modal" id="close-button">Close</Button>

                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <Button className="btn-save-modal" id="add-new-plot" onClick={this.addNewPlot} dataDismiss="modal">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL FOR UPDATING A PLOT ITEM */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="update-plot-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                {/* MODAL TITLE */}
                                <h5 className="modal-title">Edit a Plot Point</h5>

                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <Button className="close" dataDismiss="modal" ariaLabel="Close">
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </div>

                            {/* MODAL BODY */}
                            <div className="modal-body">

                                {/* FORM FIELD TO UPDATE THE NAME */}
                                <div className="form-group">
                                    <label htmlFor="update-title-input" className="label-title">Title of Plot Point</label>
                                    <FormFieldInput id="update-title-input" name="title"/>
                                </div>

                                {/* FORM FIELD OT UPDATE THE PLOT */}
                                <div className="form-group">
                                    <label htmlFor="update-plot-input" className="label-title">Plot Point</label>
                                    <textarea className="form-control" id="update-plot-input" rows="7"/>
                                </div>
                            </div>

                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">

                                {/* CLOSE THE MODAL */}
                                <Button className="btn-secondary" dataDismiss="modal">Close</Button>

                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <Button className="btn-save-modal" id="update-plot-save" onClick={this.updatePlot} dataDismiss="modal">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlotPage;