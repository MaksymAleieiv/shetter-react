import Banner from '../pageComponents/EngageBanner';
import { useState } from 'react'

function ForgotForm() {
    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState(false);
    document.title = 'Renew Password';

    function forgot(){
        
        if(email) {
            window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
        else setBadEmail(true)
    }
    const b = '   Back'
    return (
        <div className='RegLogFor' style={{height : '100%'}}>
            <Banner />
            <form class='form'>
                <div id='ForgotText'>
                    <span>Forgot Password?</span>
                    Enter the email adress that you used when you joined Shitter and we will send you instructions to reset your password.
                </div>
                <div>
                    Your Email<br />
                    <input type='email' id='forgot_email' className={badEmail ? 'longInput formInput formErrorInput' : 'longInput formInput'} onChange={val => {setBadEmail(false);setEmail(val.target.value)}} maxlength='32' />
                    {badEmail? (<div className='formErrorText'>Bad Email</div>) : ''}
                </div>
                <button className='submit' onClick={forgot}>Send Reset Instructions</button>
            </form>
            <button id='goBack' onClick={() => document.location = '/login'}>{b}</button>
        </div>
    )
}

export default ForgotForm
/*

*/