import React, {Component} from "react";
import "./Login.css";
import {Container, Row, Col} from "../../Components/Grid";
import API from "../../utils/API";
import Button from "../../Components/Button"

class Login extends Component {

    // FUNCTION TO RUN WHEN THE USER SUBMITS NEW USER REGISTRATION
    onSubmit = (e) => {
        // DON'T RELOAD THE PAGE
        e.preventDefault();

        // GRAB THE EMAIL AND PASSWORD VALUES FROM THE FORM
        let email = document.getElementById("email-register").value;
        let password = document.getElementById("password-register").value;

        // CALL API TO REGISTER A NEW USER
        API.registerUser(email, password)
        .then(res => {

            // IF THERE ARE ANY ERRORS FROM THE RESPONSE, THEN WE HAVE TO DISPLAY SOME UI HELP BECAUSE THE USER DID SOMETHING WORNG
            if (res.data.error) {
                console.log(res);
                // IF THERE'S A PASSWORD ERROR
                if (res.data.error[0].password) {
                    // DISPLAY THE PASSWORD HELP TEXT AND EMPTY THE PASSWORD FIELD
                    document.getElementById("password-help").innerHTML = "Password must be more than 5 characters"
                    document.getElementById("password-help").style.display = "inline";
                    document.getElementById("password-register").value = "";
                }
                // OTHERWISE, KEEP THE HELP TEXT HIDDEN (THIS IS IN CASE THEY TRY AGAIN)
                else {
                    document.getElementById("password-help").style.display = "none";
                }
                // IF THERE'S AN EMAIL ERROR
                if (res.data.error[0].email) {
                    // DISPLAY THE EMAIL HELP TEXT AND EMPTY THE EMAIL FIELD
                    document.getElementById("email-help").innerHTML = "Please enter a valid email"
                    document.getElementById("email-help").style.display = "inline";
                    document.getElementById("email-register").value = ""; 
                }
                // OTHERWISE, KEEP THE HELP TEXT HIDDEN (THIS IS IN CASE THEY TRY AGAIN)
                else {
                    document.getElementById("email-help").style.display = "none";
                }
                // IF THE USER ALREADY EXISTS
                if (res.data.error[0].user) {
                    // DISPLAY EMAIL HELP TEXT AND EMPTY THE EMAIL FIELD
                    document.getElementById("email-help").innerHTML = "Email already registered"
                    document.getElementById("email-help").style.display = "inline";
                    document.getElementById("email-register").value = ""; 
                }
                // IF THERE'S NO USER ERROR AND NO EMAIL ERROR, THEN HIDE THE HELP FIELD 
                else if (!res.data.error[0].user && !res.data.error[0].email) {
                    // HIDE THE HELP TEXT
                    document.getElementById("email-help").style.display = "none";
                }
            } 

            // IF THERE ARE NO ERRORS, THEN THE USER IS GOOD TO GO!!
            else {

                // SOME MAGIC TO SIMULATE A LOGIN AFTER THEY REGISTER, BECAUSE IT'S ANNOYING TO REGISTER THEN LOGIN. FILL IN THE LOGIN FORM WITH THE USER'S VALUES AND THEN SIMULATE A BUTTON CLICK
                document.getElementById("email-login").value = email;
                document.getElementById("password-login").value = password;
                document.getElementById("login-btn").click();

            }
        })
    }

    // WHEN THE USER CLICKS THE LOGIN BUTTON
    onLogin = (e) => {
        // DON'T RELOAD THE PAGE
        e.preventDefault();

        // GRAB THE EMAIL AND PASSWORD VALUES FROM THE LOGIN FORM
        let email = document.getElementById("email-login").value;
        let password = document.getElementById("password-login").value;

        // PING THE SERVER TO LOG IN THE USER
        API.loginUser(email, password)
        .then(res => {

            // THE NAVBAR USES THIS TO DO CONDITIONAL RENDER SO I GOTTA SET IT
            sessionStorage.setItem("user", "true");

            // SEND THEM TO THE DASHBOARD
            window.location.href="/dashboard";
                
        })
        // IN CASE THERE ARE ERRORS, THEN THE USER'S EMAIL OR PASSWORD IS INCORRECT
        .catch(error => {
            // DISPLAY THE LOGIN HELP TEXT AND EMPTY THE PASSWORD FIELD
            document.getElementById("login-help").innerHTML = "Incorrect email or password"
            document.getElementById("login-help").style.display = "inline";
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
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email-register">Email address</label>
                                            <input type="email" className="form-control" id="email-register" placeholder="Enter email"/>
                                            <small id="email-help" className="form-text"></small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password-register">Password</label>
                                            <input type="password" className="form-control" id="password-register" placeholder="Password"/>
                                            <small id="password-help" className="form-text"></small>
                                        </div>
                                        <Button onClick={this.onSubmit} className="submit-btns mb-3">Create Account</Button>
                                    </form>
                                </div>
                            </div>
                        </Col>

                        <Col size="6">
                            <div className="card mt-4" id="login-card">
                                <div className="card-body">
                                    <h3 className="mt-3 mb-4"> Login </h3>
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
                                        <Button id="login-btn mb-3" onClick={this.onLogin} className="submit-btns">Log In</Button>
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