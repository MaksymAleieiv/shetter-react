import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Profile from '../pageComponents/Profile';
import GetMe from '../functions/GetMe';
import Feed from '../pageComponents/feeds/Feed';

function UserPage() {
    const access = window.localStorage.getItem("access");
    if(access) axios.defaults.headers.common['Authorization'] = "Bearer " + access;
    const { username } = useParams();
    
    const overlay = useSelector(state => state.overlay);
    const me = useSelector(state => state.me.me);
    GetMe();
    document.title = username;
    
    const [shetsVisibility, setShetsVisibility] = useState(0);
    const [shetsLikesVisibility, setShetsLikesVisibility] = useState(true);

    const setShetsVisibilityFromChild = (c) => setShetsVisibility(c)

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        window.scroll(0,0)
        const getUsersData = async () => {
            const userData = await getUser();
            setUsersData(userData.data)
        }
        getUsersData()
    }, [username]) 
    const getUser = async () => {
        const res = await axios.get("/auth/users/" + username);
        const user = await res;
        return user
    }

    const setFeed = () => {
        if(shetsVisibility === 0) return (
            <div>
                <Feed urlNum={1}/>
            </div>
        )
        if(shetsVisibility === 1) return (
            <div>
                <Feed urlNum={14}/>
            </div>
        )
        if(shetsVisibility === 2 && shetsLikesVisibility) return (
            <>
                <div id="userPageLikes__buttons">
                    <button onClick={() => setShetsLikesVisibility(true)} className={shetsLikesVisibility ? "active" : ""}>Shets <span className="cf c">{usersData.user_post_likes_count}</span></button>
                    <button onClick={() => setShetsLikesVisibility(false)} className={!shetsLikesVisibility ? "active" : ""}>Replies <span className="cf c">{usersData.user_comment_likes_count}</span></button>
                </div>
                <div>
                    <Feed urlNum={4}/>
                </div>
            </>
        )
        if(shetsVisibility === 2 && !shetsLikesVisibility) return (
            <>
                <div id="userPageLikes__buttons">
                    <button onClick={() => setShetsLikesVisibility(true)} className={shetsLikesVisibility ? "active" : ""}>Shets <span className="cf c">{usersData.user_post_likes_count}</span></button>
                    <button onClick={() => setShetsLikesVisibility(false)} className={!shetsLikesVisibility ? "active" : ""}>Replies <span className="cf c">{usersData.user_comment_likes_count}</span></button>
                </div>
                <div>
                    <Feed urlNum={12}/>
                </div>
            </>
        )
    }

    return (
        <>      
            <div id="pageWrapper__Overlay" className={!overlay.overlayVisibility ? "" : "fixed"} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header/>
                <main>
                    <div id="main">
                        <LeftSidebar/>
                            <div id="feed" className="feed_subscriptions">
                                <Profile userData={usersData} setShetsVisibility={setShetsVisibilityFromChild} shetsVisibility={shetsVisibility}/>
                               {setFeed()}
                            </div>
                        { me.id !== -1 ? <RightSidebar /> : "" }
                    </div>
                </main>
            </div>
        </>
    )
}

export default UserPage