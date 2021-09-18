import Banner from '../pageComponents/EngageBanner';
import { useState } from 'react'
import { useHistory } from 'react-router';

function ForgotForm() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState(false);
    document.title = 'Renew Password';
    if(window.localStorage.getItem('refresh')) document.location = '/'
    function forgot(){
        
        if(email) {
            window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
        else setBadEmail(true)
    }
    const b = '   Back'
    return (
        <div className='RegLogFor' style={{height : '100%'}}>
        {!window.sessionStorage.getItem('me') ?
            <>       
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
                <button id='goBack' onClick={() => history.goBack()}>{b}</button>
            </>
            : 
            <div className='form' style={{textAlign : 'center'}}>
                Why did you come here ? <br />You thought something would be here while you're loпged on ? Pathetic !<br /> </div>}
        </div>
    )
}

export default ForgotForm
/*

*/