import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

function RightSidebar() {
    const [SuggestionsData, setSuggestionsData] = useState([]);
    useEffect(() => {
        const getSuggestionsData = async () => {
            const Suggestions = await getSuggestions();
            setSuggestionsData(Suggestions.data)
        }
        getSuggestionsData()
    }, []) 
    const getSuggestions = async () => {
        const res = await axios.get("/api/v1/suggestions/");
        const user = await res;
        return user
    }
    const getName = (authorUsername, firstName, lastName) => {
        if(firstName === "" && lastName === "") return authorUsername;
        if(firstName !== "" && lastName === "") return firstName;
        if(firstName === "" && lastName !== "") return lastName;
        if(firstName && lastName) return firstName + " " + lastName;
    }
    const Subscribe = (username, i) => {
        document.getElementById("sub_" + i).classList.toggle("active")
        axios.post('api/v1/subscribe/' + username)
        .catch(err => console.log(err))
    }
    return (
            <div id="rightSideBar">
                <ul>
                    <li id="sfu">Suggestions for You</li>
                    {SuggestionsData.map((user, index) => (
                        <li key={"s"+user.username}>
                            <div>
                                <Link to={"/user/" + user.username}>
                                    <img  className="authorAvatar" src={"https://fierce-dusk-92502.herokuapp.com" + user.profile_photo} alt="avatar"/>
                                </Link>
                                <div>
                                    <Link className="sugUsername" to={"/user/" + user.username}>
                                        {getName(user.username, user.first_name, user.last_name)}
                                    </Link>
                                    <br/>
                                    <span className="sugTag">@{user.username}</span>
                                </div>
                                <button onClick={() => Subscribe(user.username, index)} id={"sub_" + index} className="addToFriendsListButton"></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div id="Divider2"></div>
                <Link to="/sugestions">Show more...</Link>
            </div>
    )
}

export default RightSidebar
