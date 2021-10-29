import Banner from '../pageComponents/EngageBanner';
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotForm() {
    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState(false);
    document.title = 'Renew Password';

    function forgot(e){
        e.preventDefault()
        if(email) {
            window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
        else setBadEmail(true)
    }
    const b = '   Back'
    return (
        <div className='RegLogFor' style={{height : '100%'}}>
            <Banner />
            <div class='form'>
                <div id='ForgotText'>
                    <span>Forgot Password?</span>
                    Enter the email adress that you used when you joined Shitter and we will send you instructions to reset your password.
                </div>
                <div>
                    Your Email<br />
                    <input type='email' id='forgot_email' className={badEmail ? 'longInput formInput formErrorInput' : 'longInput formInput'} onChange={val => {setBadEmail(false);setEmail(val.target.value)}} maxlength='32' />
                    {badEmail? (<div className='formErrorText'>Bad Email</div>) : ''}
                </div>
                <button className='submit' onClick={e => forgot(e)}>Send Reset Instructions</button>
            </div>
            <Link id='goBack' to='/login'>{b}</Link>
        </div>
    )
}

export default ForgotForm
/*

*/