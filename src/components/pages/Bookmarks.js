import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Overlay from '../pageComponents/Overlay';
import { useState } from 'react';
import LikedPosts from '../pageComponents/feeds/LikedPostsFeed';
import LikedComments from '../pageComponents/feeds/LikedCommentsFeed';

import GetMe from '../functions/GetMe';

function Bookmarks() {
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [overlayImage, setOverlayImage] = useState({});
    const [overlayImages, setOverlayImages] = useState([]);
    document.title = "Bookmarks"
   
    const setOverlayImagesFromChild = (c) => setOverlayImages(c)
    const setOverlayImageFromChild = (c) => setOverlayImage(c)
    const setOverlayVisibilityFromChild = (c) => setOverlayVisibility(c)

    const [shetsBookmarksVisibility, setShetsBookmarksVisibility] = useState(true);
    
    const {me} = GetMe();

    return (
        <>
            <Overlay setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImage={setOverlayImageFromChild} setOverlayImages={setOverlayImagesFromChild}
            overlayVisibility={overlayVisibility} overlayImage={overlayImage} overlayImages={overlayImages}/>
            <div id="pageWrapper__Overlay" className={!overlayVisibility ? "" : "fixed"} style={!overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header me={me}/>
                <main>
                    <div id="main">
                        <LeftSidebar me={me}/>
                        <div id="feed" className="feed_subscriptions"> 
                            <div id="posts">
                                <div id="userPageLikes__buttons">
                                    <button onClick={() => setShetsBookmarksVisibility(p => !p)} className={shetsBookmarksVisibility ? "active" : ""}>Shets</button>
                                    <button onClick={() => setShetsBookmarksVisibility(p => !p)} className={!shetsBookmarksVisibility ? "active" : ""}>Replies</button>
                                </div>
                                <div style={shetsBookmarksVisibility ? {} : {display : 'none'}}>
                                    <LikedPosts me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild} book={true}/>
                                </div>
                                <div style={!shetsBookmarksVisibility ? {} : {display : 'none'}}>
                                    <LikedComments me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild} book={true}/>
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

export default Bookmarks
