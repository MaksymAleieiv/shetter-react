import axios from 'axios';

import Banner from '../pageComponents/EngageBanner';

import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import { useState } from 'react';

import GoogleLogin from 'react-google-login';

import ReglogGoogle from '../functions/ReglogGoogle';

function LoginForm() {
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [generalErrorText, setGeneralErrorText] = useState('');
    const setGenTextFromChild = (c) => setGeneralErrorText(c);
    document.title = 'Login';


    const login = (values) => {  
        setEmailErrorText('');
        setPasswordErrorText(''); 
        axios.post('/token/login/', {
            'password': values.Password,
            'email': values.Email
        },{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        })
        .then(response => {
            const res = JSON.parse(response.request.response);
            console.log(res)
            window.localStorage.setItem('refresh', res.refresh);
            window.localStorage.setItem('access', res.access);
            document.location.reload();
        })
        .catch(response => {
            const res = JSON.parse(response.request.response)
            console.log(res)
            res.non_field_errors ? setGeneralErrorText(res.non_field_errors) : setGeneralErrorText('');
            res.detail ? setGeneralErrorText('Wrong Email or Password') : setGeneralErrorText('');
            res.email ? setEmailErrorText(res.email) : setEmailErrorText('');
            res.password ? setPasswordErrorText(res.password) : setPasswordErrorText(''); 
        })
    }
    const b = '   Back';
    const loginGoogle = (response) => {
        ReglogGoogle(true, response[Object.getOwnPropertyNames(response)[1]].login_hint, response.profileObj.email, response[Object.getOwnPropertyNames(response)[1]].idpId, response.profileObj.givenName, setGenTextFromChild) 
    }
    return (
            <div className='RegLogFor' style={{height : '100%'}}>
                <Banner />
                <Form onSubmit={login}>
                    {({handleSubmit}) => (
                        <form className='form' onSubmit={handleSubmit}>

                            <div className='idk__rlForm'>
                                <h3>Log in to Shetter</h3>
                                <div className='idk__buttons'>                                          
                                    <GoogleLogin
                                        clientId='283989207573-odnlpid41e0jmbv28ncl2ojdetf3t2m8.apps.googleusercontent.com'
                                        onSuccess={loginGoogle}
                                        buttonText='            Log in with Google'
                                        cookiePolicy={'none'}
                                        className='idk__buttons__google'
                                    />
                                </div>
                                <div className='idk__orShit'>
                                    <div className='idk__line'></div>
                                    <span>Or</span>
                                    <div className='idk__line'></div>
                                </div>
                            </div>

                            <Field name='Email'>
                                {({input}) => (
                                    <div>
                                        <label>Your Email</label><br />
                                        <input {...input} type='email' className={emailErrorText !== '' ? 'longInput formInput formErrorInput' : 'longInput formInput'} onClick={() => {setGeneralErrorText(''); setEmailErrorText('')}} maxLength='32' /><br />
                                        {emailErrorText !== '' ? (<div className='formErrorText'>{emailErrorText}</div>) : ''}
                                    </div>
                                )}
                            </Field>
                            <Link className='f5Text' id='forgot' to='/forgot'>Forgot password?</Link>
                            <Field name='Password'>
                                {({input}) => (
                                    <div>
                                        <label>Password</label><br />
                                        <input {...input} type='password' className={passwordErrorText !== '' ? 'longInput formInput formErrorInput' : 'longInput formInput'}  onClick={() => {setGeneralErrorText(''); setPasswordErrorText('')}} maxLength='32' /><br />
                                        {passwordErrorText !== '' ? (<div className='formErrorText'>{passwordErrorText}</div>) : ''}
                                        {generalErrorText !== '' ? (<div className='formErrorText'>{generalErrorText}</div>) : ''}
                                    </div>
                                )}
                            </Field>
                            <button className='submit' type='submit'>Log In</button>
                        </form>
                    )}
                </Form>
                <button id='goBack' onClick={() => document.location = '/registration'}>{b}</button>
            </div>
                
    )
}

export default LoginForm
