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

    updatePlotList = () => {

        let storyId = localStorage.getItem("currentStoryId");

        console.log(storyId);

        API.getAll("plots", storyId)
        .then(res => {
            console.log(res);
            let data = res.data;

            this.setState({plots: data});

            console.log(this.state.plots);
        })
    } 

    componentDidMount() {

        this.updatePlotList();
    }

    onDelete = (e) => {
        let id = e.target.id;
    
        
        API.deleteOne("plots", id)
        .then(res => {
            console.log(res);

            // LOOP THROUGH PLOTS TO UPDATE EACH POSITION NUMBER SINCE WE JUST DELETED ONE
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

    addNewPlot = () => {
        let title = document.getElementById("add-title-input").value;
        let plot = document.getElementById("add-plot-input").value;

        let position = this.state.plots.length + 1;
        let storyId = localStorage.getItem("currentStoryId");

        API.addNewPlot(title, plot, position, storyId)
        .then(res => {
            console.log(res);
            this.updatePlotList();
            document.getElementById("add-title-input").value = "";
            document.getElementById("add-plot-input").value = "";
        })
    }

    onEdit = (e) => {
        let id = e.target.id;
        console.log('clicked')

        let title;
        let plotText;

        this.state.plots.forEach(plot => {
            if (plot.id == id) {
                title = plot.title;
                plotText = plot.plot_text;
            }
        })

        document.getElementById("update-title-input").value = title;
        document.getElementById("update-plot-input").value = plotText;

        document.getElementById("update-plot-save").setAttribute('data-id', id);


        // API.updateOne("plots", id, )
    }

    updatePlot = () => {
        let id = document.getElementById("update-plot-save").getAttribute('data-id');

        let title = document.getElementById("update-title-input").value;
        let plotText = document.getElementById("update-plot-input").value;

        console.log(id);   
        console.log(title);
        console.log(plotText);

        API.updateOne("plots", id, "title", title)
        .then(res => {
            API.updateOne("plots", id, "plot_text", plotText)
            .then(res => {
                console.log(res);
                this.updatePlotList();

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