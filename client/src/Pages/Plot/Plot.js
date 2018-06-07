import React, {Component} from "react";
import "./Plot.css";
import {Row, Col} from "../../Components/Grid";
import BackButton from "../../Components/BackButton";
import TimelineItem from "../../Components/TimelineItem";
import AddAnItem from "../../Components/AddAnItem";
import API from "../../utils/API";

class PlotPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            plots: []
        }

        

        // BIND THIS FOR HANDLECLICK
        // this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {

        API.getAll("plots")
        .then(res => {
            console.log(res);
            let data = res.data;

            this.setState({plots: data});

            console.log(this.state.plots);
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
                            <AddAnItem id="add-plot-prompt">Add a Plot Point </AddAnItem>
                        </Col>
                    </Row>

                    {this.state.plots.map(plot => {
                        return <TimelineItem 
                                id={plot.id} 
                                key={plot.id}
                                title={plot.title}>
                                    {plot.plot_text}
                                </TimelineItem>
                    })}
                    {/* <TimelineItem title="Card title">
                        Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.
                    </TimelineItem>
                    <TimelineItem title="Card title">
                        Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.
                    </TimelineItem>
                    <TimelineItem title="Card title">
                        Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.
                    </TimelineItem>                     */}
                </Row>
            </div>
        )
    }
}

export default PlotPage;