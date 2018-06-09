import React, {Component} from "react";
import "./Plot.css";
import {Row, Col} from "../../Components/Grid";
import BackButton from "../../Components/BackButton";
import TimelineItem from "../../Components/TimelineItem";
import AddAnItem from "../../Components/AddAnItem";
import API from "../../utils/API";
import {FormFieldInput} from "../../Components/Form"

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

    // FUNCTION TO PING THE API AND UPDATE THE PLOT ARRAY STATE
    updatePlotList = () => {

        // GRAB THE STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        // CALL THE API TO GET ALL PLOT POINTS FOR THE STORY ID
        API.getAll("plots", storyId)
        .then(res => {
            // PULL OUT THE RESPONSE DATA
            let data = res.data;

            // UPDATE THE STATE WITH THE DATA
            this.setState({plots: data});

            console.log(this.state.plots);
        })
    } 

    // AS SOON AS THE APP LOADS
    componentDidMount() {
        // CALL THE UPDATE PLOT FUNCTION
        this.updatePlotList();
    }

    // WHEN THE USER HITS THE DELETE BUTTON ON ANY PLOT POINT
    onDelete = (e) => {
        // GRAB THE ID OF THE BUTTON FROM THE CLICK EVENT
        let id = e.target.id;
    
        // CALL THE API TO DELETE THE PLOT ITEM WITH THE ID
        API.deleteOne("plots", id)
        .then(res => {
            console.log(res);

            // LOOP THROUGH PLOTS TO UPDATE EACH POSITION NUMBER SINCE WE JUST DELETED ONE AND THE POSITIONS NEED TO BE NUMERICALLY IN ORDER
            this.state.plots.forEach(plot => {
                // GRAB THE INDEX OF THE ITEM IN THE ARRAY AND ADD 1 SO WE DON'T START ON 0
                let newPosition = this.state.plots.indexOf(plot) + 1;
    
                // PING THE DATABASE TO UPDATE THAT ITEM WITH THE NEW POSITION
                API.updateOne("plots", plot.id, "position", newPosition)
                .then(res => {
                    console.log("updated position");

                    // UPDATE THE PLOT LIST 
                    this.updatePlotList();
                })
            })

            // UPDATE THE PLOT LIST AGAIN BECAUSE IDK 
            this.updatePlotList();
        })
        
    }

    // FUNCTION TO ADD A NEW PLOT POINT
    addNewPlot = () => {
        // GRAB THE TITLE FROM THE INPUT FIELD
        let title = document.getElementById("add-title-input").value;

        // GRAB THE PLOT TEXT FROM THE INPUT FIELD 
        let plot = document.getElementById("add-plot-input").value;

        // THE NEW POSITION WILL BE AFTER THE LAST ITEM'S POSITION, WHICH WE CAN CALCULATE WITH THE LENGTH OF THE ARRAY AND THEN ADD ONE
        let position = this.state.plots.length + 1;

        // GRAB THE STORY ID FROM LOCAL STORAGE
        let storyId = localStorage.getItem("currentStoryId");

        // PING API TO ADD A NEW PLOT WITH THE DATA
        API.addNewPlot(title, plot, position, storyId)
        .then(res => {
            console.log(res);
            // UPDATE THE PLOT LIST
            this.updatePlotList();

            // EMPTY THE FORM FIELDS
            document.getElementById("add-title-input").value = "";
            document.getElementById("add-plot-input").value = "";
        })
    }

    // WHEN THE USER EDITS A PLOT ITEM, WE NEED TO POPULATE THE MODAL WITH THE CORRECT ITEM'S INFO
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

    // FUNCTION THAT RUNS WHEN THE USER SAVES THE PLOT INFO THEY'VE EDITED
    updatePlot = () => {
        // GRAB THE DATA ID OF THE MODAL
        let id = document.getElementById("update-plot-save").getAttribute('data-id');

        // GRAB THE TITLE FROM THE FORM INPUT
        let title = document.getElementById("update-title-input").value;

        // GRAB THE PLOT TEXT FROM THE FORM INPUT
        let plotText = document.getElementById("update-plot-input").value;

        // API CALL TO UPDATE ONE ITEM, WITH THE DATA WE GOT. BUT WE HAVE TO DO 2 SEPARATE API CALLS BECAUSE THE API UTIL ONLY UPDATES ONE COLUMN LOL.
        API.updateOne("plots", id, "title", title)
        .then(res => {
            API.updateOne("plots", id, "plot_text", plotText)
            .then(res => {
                console.log(res);
                // UPDATE THE PLOT LIST
                this.updatePlotList();

                // EMPTY THE FORM VALUES
                document.getElementById("update-title-input").value = "";
                document.getElementById("update-plot-input").value = "";
            })
        })
    }

    render() {
        return (
            <div id="entire-page">
                <Row id="plot-editor-row">
                    <Row id="back-button-row">
                        <Col size="3">
                            <BackButton />
                        </Col>

                        <Col size="6">
                            <AddAnItem id="add-plot-prompt" target="#add-plot-modal">Add a Plot Point </AddAnItem>
                        </Col>
                    </Row>

                    {/* MAP THROUGH THE PLOT STATE AND RETURN A TIMELINE ITEM */}
                    {this.state.plots.map(plot => {
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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="add-title-input" className="label-title">Title of Plot Point</label>
                                    <FormFieldInput id="add-title-input" name="title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-plot-input" className="label-title">Plot Point</label>
                                    <textarea className="form-control" id="add-plot-input" rows="5"/>
                                </div>
                            </div>
                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">
                                {/* CLOSE THE MODAL */}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <button type="button" className="btn btn-save-modal" id="add-new-plot" onClick={this.addNewPlot} data-dismiss="modal">Save</button>
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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="update-title-input" className="label-title">Title of Plot Point</label>
                                    <FormFieldInput id="update-title-input" name="title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="update-plot-input" className="label-title">Plot Point</label>
                                    <textarea className="form-control" id="update-plot-input" rows="7"/>
                                </div>
                            </div>
                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">
                                {/* CLOSE THE MODAL */}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <button type="button" className="btn btn-save-modal" id="update-plot-save" onClick={this.updatePlot} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlotPage;