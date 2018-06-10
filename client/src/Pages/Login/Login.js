import React, {Component} from "react";
import "./Login.css";
import {Container, Row, Col} from "../../Components/Grid";
import API from "../../utils/API";
// import CardBody from "../../Components/CardBody";
// import Button from "../../Components/Button";

class Login extends Component {
    
    login = () => {
        sessionStorage.setItem("userId", "1");
        window.location.href="/dashboard";
    }   

    onSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById("username-register").value;
        let email = document.getElementById("email-register").value;
        let password = document.getElementById("password-register").value;
        console.log(username)
        console.log(email)
        console.log(password)

        API.registerUser(username, email, password)
        .then(res => {

            // first we gotta check if theres errors in the first place
            if (res.data.error) {
                console.log(res);

                if (res.data.error[0].password) {
                    document.getElementById("password-help").innerHTML = "Password must be more than 5 characters"
                    document.getElementById("password-help").style.display = "inline";
                    document.getElementById("password-register").value = "";
                }
                else {
                    document.getElementById("password-help").style.display = "none";
                }
    
                if (res.data.error[0].email) {
                    document.getElementById("email-help").innerHTML = "Please enter a valid email"
                    document.getElementById("email-help").style.display = "inline";
                    document.getElementById("email-register").value = ""; 
                }
                else {
                    document.getElementById("email-help").style.display = "none";
                }
    
                if (res.data.error[0].username) {
                    document.getElementById("username-help").innerHTML = "Username must be more than 5 characters"
                    document.getElementById("username-help").style.display = "inline";
                }
                else {
                    document.getElementById("username-help").style.display = "none";
                }
    
                if (res.data.error[0].user) {
                    document.getElementById("email-help").innerHTML = "Email already registered"
                    document.getElementById("email-help").style.display = "inline";
                    document.getElementById("email-register").value = ""; 
                }
                // if there's no user error and no email error, then we can hide the thing
                else if (!res.data.error[0].user && !res.data.error[0].email) {
                    document.getElementById("email-help").style.display = "none";
                }
            } 

            else {
                console.log(res);

                let userId = res.data.id;

                sessionStorage.setItem("userId", userId);
                window.location.href="/dashboard";

            }
        })
    }

    onLogin = (e) => {
        e.preventDefault();
        let email = document.getElementById("email-login").value;
        let password = document.getElementById("password-login").value;

        // console.log(email)
        // console.log(password)

        API.loginUser(email, password)
        .then(res => {
            console.log(res);
            let userId = res.data.id;

                sessionStorage.setItem("userId", userId);
                window.location.href="/dashboard";
                
        })
        .catch(error => {
            console.log(error);
            console.log("Username or password is incorrect");
            document.getElementById("login-help").innerHTML = "Incorrect email or password"
            document.getElementById("login-help").style.display = "inline";
            document.getElementById("email-login").value = "";
            document.getElementById("password-login").value = "";
        })
    }

    // RENDER THINGS TO THE PAGE
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="6">
                            <div className="card mt-4" id="register-card">
                                <div className="card-body">
                                    <h3 className=" mt-3 mb-4"> Register </h3>
                                    <button className="btn btn-info btn-block mb-4">Sign Up With Google</button>
                                    <h5 className="mb-4">Or create an account:</h5>

                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email-register">Email address</label>
                                            <input type="email" className="form-control" id="email-register" placeholder="Enter email"/>
                                            <small id="email-help" className="form-text"></small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username-register">Username</label>
                                            <input type="text" className="form-control" id="username-register" placeholder="Enter a username"/>
                                            <small id="username-help" className="form-text"></small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password-register">Password</label>
                                            <input type="password" className="form-control" id="password-register" placeholder="Password"/>
                                            <small id="password-help" className="form-text"></small>
                                        </div>
                                        <button type="submit" className="btn submit-btns mb-3" onClick={this.onSubmit}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </Col>

                        <Col size="6">
                            <div className="card mt-4" id="login-card">
                                <div className="card-body">
                                    <h3> Login </h3>
                                    <small id="login-help" className="form-text mb-3 mt-3"></small>

                                    <form>
                                        
                                        <div className="form-group">
                                            
                                            <label htmlFor="email-login">Email address</label>
                                            <input type="email" className="form-control" id="email-login" placeholder="Enter email"/>
                                            
                                        </div>
                
                                        <div className="form-group">
                                            <label htmlFor="password-login">Password</label>
                                            <input type="password" className="form-control" id="password-login" placeholder="Password"/>
                                        </div>
                                        <button type="submit" className="btn submit-btns mb-3" id="login-btn" onClick={this.onLogin}>Submit</button>
                                    </form> 
                                </div>
                            </div>
                        </Col>  
                    </Row>
                </Container>
            </div>
        
        )
    }
}

export default Login;