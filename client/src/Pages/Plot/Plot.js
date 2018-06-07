import React, {Component} from "react";
import "./Plot.css";
import {Row, Col} from "../../Components/Grid";
import BackButton from "../../Components/BackButton";
import TimelineItem from "../../Components/TimelineItem";

class PlotPage extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            
        }

        // BIND THIS FOR HANDLECLICK
        // this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div>
                <Row id="plot-editor-row">
                    <Row id="back-button-row">
                        <Col size="12">
                            <BackButton />
                        </Col>
                    </Row>

                    {/* <TimelineItem title="Card title">
                        Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.
                    </TimelineItem> */}
                    <Row id="timeline-row">
                        <Col size="2" id="line-col">
                            <div className="circle"/>
                        </Col>
                        <Col size="8" id="plot-col">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Card title</h4>
                                    <p className="card-text">Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* <Row id="timeline-row">
                        <Col size="2" id="line-col">
                            <div className="circle"/>
                        </Col>
                        <Col size="8" id="plot-col">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Card title</h4>
                                    <p className="card-text">Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row id="timeline-row">
                        <Col size="2" id="line-col">
                            <div className="circle"/>
                        </Col>
                        <Col size="8" id="plot-col">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Card title</h4>
                                    <p className="card-text">Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                </div>
                            </div>
                        </Col>
                    </Row> */}
                    
                </Row>
            </div>
        )
    }
}

export default PlotPage;