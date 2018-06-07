import React from "react";
import "./Login.css";
import {Container, Row, Col} from "../../Components/Grid";
// import CardBody from "../../Components/CardBody";
// import Button from "../../Components/Button";

const Login = () => (
    <div>
        <Container>
            <Row>
                <Col size="6">
                    <div className="card mt-4" id="register-card">
                        <div className="card-body">
                            <h3 className=" mt-3 mb-4"> Register </h3>
                            <button className="btn btn-info btn-block mb-4">Sign Up With Google</button>
                            <h5 className="mb-4">Or create an account:</h5>

                            {/* PROBABLY SHOULD BE AN AXIOS CALL...... */}
                            <form action="/register" method="POST">
                                <div className="form-group">
                                    <label for="email-register">Email address</label>
                                    <input type="email" className="form-control" id="email-register" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label for="username-register">Username</label>
                                    <input type="text" className="form-control" id="username-register" placeholder="Enter a username"/>
                                </div>
                                <div className="form-group">
                                    <label for="password-register">Password</label>
                                    <input type="password" className="form-control" id="password-register" placeholder="Password"/>
                                </div>
                                <button type="submit" class="btn submit-btns mb-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </Col>

                <Col size="6">
                    <div className="card mt-4" id="login-card">
                        <div className="card-body">
                            <h3> Login </h3>
                        </div>
                    </div>
                </Col>  
            </Row>
        </Container>
    </div>
)

export default Login;