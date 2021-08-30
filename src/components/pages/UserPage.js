import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Profile from '../pageComponents/Profile';
import ShetsUserPage from '../pageComponents/feeds/Shets__UserPage';
import CommentsUserPage from '../pageComponents/feeds/Comments__UserPage';
import LikedPosts from '../pageComponents/feeds/LikedPostsFeed';
import LikedComments from '../pageComponents/feeds/LikedCommentsFeed';
import GetMe from '../functions/GetMe';
import Overlay from '../pageComponents/Overlay';

function UserPage() {
    const access = window.localStorage.getItem("access");
    if(access) axios.defaults.headers.common['Authorization'] = "Bearer " + access;
    const { username } = useParams();
    const {me} = GetMe();
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [overlayImage, setOverlayImage] = useState({});
    const [overlayImages, setOverlayImages] = useState([]);
    document.title = username;
    
    const [shetsVisibility, setShetsVisibility] = useState(0);
    const [shetsLikesVisibility, setShetsLikesVisibility] = useState(true);

    const setOverlayImagesFromChild = (c) => setOverlayImages(c)
    const setOverlayImageFromChild = (c) => setOverlayImage(c)
    const setOverlayVisibilityFromChild = (c) => setOverlayVisibility(c)
    const setShetsVisibilityFromChild = (c) => setShetsVisibility(c)

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
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

    return (
        <>      
            <Overlay setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImage={setOverlayImageFromChild} setOverlayImages={setOverlayImagesFromChild}
            overlayVisibility={overlayVisibility} overlayImage={overlayImage} overlayImages={overlayImages}/>
            <div id="pageWrapper__Overlay" className={!overlayVisibility ? "" : "fixed"}>
                <Header me={me}/>
                <main>
                    <div id="main">
                        <LeftSidebar me={me}/>
                            <div id="feed" className="feed_subscriptions">
                                <Profile userData={usersData} setShetsVisibility={setShetsVisibilityFromChild} shetsVisibility={shetsVisibility} me={me}/>
                                <div style={shetsVisibility === 0 ? {} : {display : 'none'}}>
                                    <ShetsUserPage me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild}/>
                                </div>
                                <div style={shetsVisibility === 1 ? {} : {display : 'none'}}>
                                    <CommentsUserPage me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild}/>
                                </div>
                                <div style={shetsVisibility === 2 ? {} : {display : 'none'}}>
                                    <div id="userPageLikes__buttons">
                                        <button onClick={() => setShetsLikesVisibility(p => !p)} className={shetsLikesVisibility ? "active" : ""}>Shets <span className="cf c">{usersData.user_post_likes_count}</span></button>
                                        <button onClick={() => setShetsLikesVisibility(p => !p)} className={!shetsLikesVisibility ? "active" : ""}>Replies <span className="cf c">{usersData.user_comment_likes_count}</span></button>
                                    </div>
                                    <div style={shetsLikesVisibility ? {} : {display : 'none'}}>
                                        <LikedPosts me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild}/>
                                    </div>
                                    <div style={!shetsLikesVisibility ? {} : {display : 'none'}}>
                                        <LikedComments me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild}/>
                                    </div>
                                </div>
                            </div>
                        {me ? <RightSidebar /> : ""}
                    </div>
                </main>
            </div>
        </>
    )
}

export default UserPage