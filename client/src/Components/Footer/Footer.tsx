import React from 'react';
import "./Footer.css";

const Footer = () => (
    <div>
        <footer className="footer">
            <p 
                id="footer-text" 
                className="text-center"
            > 
                © Novelize 2018 | 
                <a 
                    className="footer-links" 
                    data-toggle="modal" 
                    data-target="#about-modal"
                >
                    About
                </a> 
            </p>
        </footer> 

        <div className="modal fade" tabIndex={-1} role="dialog" id="about-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">About This Application</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>This app was created as part of UCF's Coding Bootcamp by Victoria League. It's a beta-version, full-stack Javascript application deployed on Heroku. For more information about the application and the code it runs on, <a href="https://github.com/vleague2/novelize" target="_blank">click here.</a></p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Footer;