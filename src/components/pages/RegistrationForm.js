import axios from 'axios';

import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import { useState } from 'react';

import Banner from '../pageComponents/EngageBanner';
import { useHistory } from 'react-router';

import GoogleLogin from 'react-google-login';
import ReglogGoogle from '../functions/ReglogGoogle';

function RegistrationForm() {
    const history = useHistory();

    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [generalErrorText, setGeneralErrorText] = useState("");
    const setGenTextFromChild = (c) => setGeneralErrorText(c);
    document.title = "Registration";
    if(window.localStorage.getItem('access') && window.sessionStorage.getItem('me')) document.location = "/"


    const registration = (values) => {
        setEmailErrorText("");
        setUsernameErrorText("");
        setPasswordErrorText("");
        if(values.Password === values.ConfPassword){
            axios.post("/auth/users/", {
                "username": values.Username,
                "password": values.Password,
                "email": values.Email
            },{
                "Content-Type" : "multipart/form-data"
            })
            .then(() => {
                axios.post("/token/login/", {
                    "password": values.Password,
                    "email": values.Email
                },{
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                })
                .then(response => {
                    const res = JSON.parse(response.request.response);
                    window.localStorage.setItem("refresh", res.refresh);
                    window.localStorage.setItem("access", res.access);
                    document.location = "/"
                })
                .catch(() => {document.location = "/login"})
            })
            .catch(response => {
                const res = JSON.parse(response.request.response)
                res.email ? setEmailErrorText(res.email) : setEmailErrorText("");
                res.username ? setUsernameErrorText(res.username) : setUsernameErrorText("");
                res.password ? setPasswordErrorText(res.password) : setPasswordErrorText("");
            })
        }else{
            setPasswordErrorText("Password do not match")
        }
    }
    const b = "   Back"
    const loginGoogle = (response) => {
        console.log(response)
        console.log(response.Xb.login_hint)
        console.log(response.Zb.login_hint)
        if(response.Zb.login_hint !== undefined) ReglogGoogle(false, response.Zb.login_hint, response.profileObj.email, response.Zb.idpId, response.profileObj.givenName, setGenTextFromChild)
        if(response.Xb.login_hint !== undefined) ReglogGoogle(false, response.Xb.login_hint, response.profileObj.email, response.Zb.idpId, response.profileObj.givenName, setGenTextFromChild)
    }
    return (
            <div className="RegLogFor" style={{height : '100%'}}>
                {!window.sessionStorage.getItem('me') ?
                    <>       
                        <Banner />
                        <Form onSubmit={registration}>
                            {({handleSubmit}) => (
                                <form className="form" onSubmit={handleSubmit}>

                                    <div className="idk__rlForm">
                                        <h3>Sign up to Shetter</h3>
                                        <div className="idk__buttons">                                          
                                            <GoogleLogin
                                                clientId="283989207573-odnlpid41e0jmbv28ncl2ojdetf3t2m8.apps.googleusercontent.com"
                                                onSuccess={loginGoogle}
                                                buttonText="            Sign up with Google"
                                                cookiePolicy={'none'}
                                                className="idk__buttons__google"
                                            />
                                        </div>
                                        <div className="idk__orShit">
                                            <div className="idk__line"></div>
                                            <span>Or</span>
                                            <div className="idk__line"></div>
                                        </div>
                                    </div>

                                    <Field name="Email">
                                        {({input}) => (
                                            <div>
                                                <label>Your Email</label><br />
                                                <input {...input} type="email" className={emailErrorText !== "" ? "longInput formInput formErrorInput" : "longInput formInput"} onClick={() => setEmailErrorText("")} maxLength="32" /><br />
                                                {emailErrorText !== "" ? (<div className="formErrorText">{emailErrorText}</div>) : ""}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="Username">
                                        {({input}) => (
                                            <div>
                                                <label>Username</label><br />
                                                <input {...input} type="text" className={usernameErrorText !== "" ? "longInput formInput formErrorInput" : "longInput formInput"} onClick={() => setUsernameErrorText("")} maxLength="15" /><br />
                                                {usernameErrorText !== "" ? (<div className="formErrorText">{usernameErrorText}</div>) : ""}
                                            </div>
                                        )}
                                    </Field>
                                    <div>
                                        <div style={{display : 'flex'}}>          
                                            <Field name="Password">
                                                {({input}) => (
                                                    <div>
                                                        <label>Password</label><br />
                                                        <input {...input} type="password" className={passwordErrorText !== "" ? "shortInput formInput formErrorInput" : "shortInput formInput"} onClick={() => setPasswordErrorText("")} maxLength="32" /><br />
                                                    </div>
                                                )}
                                            </Field>                              
                                            <Field name="ConfPassword">
                                                {({input}) => (
                                                    <div style={{marginLeft : 20}}>
                                                        <label>Confirm Password</label><br />
                                                        <input {...input} type="password" className={passwordErrorText !== "" ? "shortInput formInput formErrorInput" : "shortInput formInput"} onClick={() => setPasswordErrorText("")} maxLength="32" /><br />
                                                    </div>
                                                )}
                                            </Field>                               
                                        </div>    
                                        {passwordErrorText !== "" ? (<div className="formErrorText">{passwordErrorText}</div>) : ""}
                                        {generalErrorText !== "" ? (<div className="formErrorText">{generalErrorText}</div>) : ""}
                                    </div>
                                    <button className="submit" type="submit">Create Account</button>
                                </form>
                            )}
                        </Form>
                        <button id="goBack" onClick={() => history.goBack()}>{b}</button>
                        <div id="loginAskHolder">
                            Already have an account? 
                            <Link to="/login" className="f5Text">Log In</Link>
                        </div>
                    </>
                    : 
                    <div className="form" style={{textAlign : 'center'}}>Why did you come here ? <br />You thought something would be here while you're logпed on ? Pathetic !<br /> </div>}
            </div>            
    )
}
export default RegistrationForm