import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
import errorImgPNG from '../images/errorImg.png'

function RightSidebar() {
    console.log('rigth sidebar rerendered')
    const [SuggestionsData, setSuggestionsData] = useState([]);
    useEffect(() => {
        const getSuggestions = async () => {
            try{         
                const {data} = await axios.get('/api/v1/suggestions/')
                setSuggestionsData(data)
            }catch{

            }
        }
        getSuggestions()
    }, []) 
    const getName = (authorUsername, firstName, lastName) => {
        if(firstName === '' && lastName === ''){
            if(authorUsername.length < 13) return authorUsername;
            else return authorUsername.slice(0, 12) + '...'
        } 
        if(firstName !== '' && lastName === ''){
            if(firstName.length < 13) return firstName;
            else return firstName.slice(0, 12) + '...'
        }
        if(firstName === '' && lastName !== ''){
            if(lastName.length < 13) return lastName;
            else return lastName.slice(0, 12) + '...'
        }
        if(firstName && lastName){
            if(lastName.length + lastName.length < 13) return firstName + ' ' + lastName;
            else{
                if((firstName + ' ' + lastName)[12] !== ' ') return (firstName + ' ' + lastName).slice(0, 12) + '...';
                else return (firstName + ' ' + lastName).slice(0, 11) + '...';
            }
        }
    }
    const Subscribe = (username, i) => {
        document.getElementById('sub_' + i).classList.toggle('active')
        axios.post('api/v1/subscribe/' + username)
        .catch(err => console.log(err))
    }
        return (SuggestionsData.length > 0 &&
            <div id='rightSideBar'>
                <ul>
                    <li id='sfu'>Suggestions for You</li>
                    {SuggestionsData.map((user, index) => (
                        <li key={'s'+user.username}>
                            <div>
                                <Link to={'/user/' + user.username}>
                                    <img  className='authorAvatar' src={'https://fierce-dusk-92502.herokuapp.com' + user.profile_photo} onError={(e)=>{e.target.onerror = null; e.target.src=errorImgPNG}} alt=''/>
                                </Link>
                                <div>
                                    <Link className='sugUsername' to={'/user/' + user.username}>
                                        {getName(user.username, user.first_name, user.last_name)}
                                    </Link>
                                    <br/>
                                    <span className='sugTag'>@{user.username.length < 13 ? user.username : user.username.slice(0, 11) + '...'}</span>
                                </div>
                                <button onClick={() => Subscribe(user.username, index)} id={'sub_' + index} className='addToFriendsListButton'></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div id='Divider2'></div>
                <div style={{opacity: .75, fontWeight: 200, marginTop: 13, marginLeft: 16}}>Shetter. </div>
            </div>)
}

export default RightSidebar
// <Link to='/sugestions'>Show more...</Link>
