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
        if(firstName === '' && lastName === '') return authorUsername;
        if(firstName !== '' && lastName === '') return firstName;
        if(firstName === '' && lastName !== '') return lastName;
        if(firstName && lastName) return firstName + ' ' + lastName;
    }
    const Subscribe = (username, i) => {
        document.getElementById('sub_' + i).classList.toggle('active')
        axios.post('api/v1/subscribe/' + username)
        .catch(err => console.log(err))
    }
        return (SuggestionsData.length > 0 ?
            <div id='rightSideBar'>
                <ul>
                    <li id='sfu'>Suggestions for You</li>
                    {SuggestionsData.map((user, index) => (
                        <li key={'s'+user.username}>
                            <div>
                                <Link to={'/user/' + user.username}>
                                    <img  className='authorAvatar' src={'https://fierce-dusk-92502.herokuapp.com' + user.profile_photo} onError={(e)=>{e.target.onerror = null; e.target.src=errorImgPNG}} alt='avatar'/>
                                </Link>
                                <div>
                                    <Link className='sugUsername' to={'/user/' + user.username}>
                                        {getName(user.username, user.first_name, user.last_name)}
                                    </Link>
                                    <br/>
                                    <span className='sugTag'>@{user.username}</span>
                                </div>
                                <button onClick={() => Subscribe(user.username, index)} id={'sub_' + index} className='addToFriendsListButton'></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div id='Divider2'></div>
                <Link to='/sugestions'>Show more...</Link>
            </div> : '')
}

export default RightSidebar
