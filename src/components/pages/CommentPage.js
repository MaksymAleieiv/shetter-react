
import { useParams } from 'react-router';
import { useState } from 'react';

import GetMe from '../functions/GetMe';
import PostsLoader from '../functions/PostsLoader';

import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Post from '../pageComponents/Post';
import CommentsPart from '../pageComponents/postComponents/CommentsPart';
import CreatePostForm from '../pageComponents/postComponents/CreatePostForm';
import Overlay from '../pageComponents/Overlay';

function CommentPage() {

    const {me} = GetMe();

    const { comment_id } = useParams();
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [overlayImage, setOverlayImage] = useState({});
    const [overlayImages, setOverlayImages] = useState([]);
    document.title = "Single Post";
 
    const setOverlayImagesFromChild = (c) => setOverlayImages(c)
    const setOverlayImageFromChild = (c) => setOverlayImage(c)
    const setOverlayVisibilityFromChild = (c) => setOverlayVisibility(c)

    const { Data } = PostsLoader(comment_id, 8)
    
    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)
    const colorFunc = (c) => {
        if(postWarningColor !== 0)setTimeout(() => setColor(0), 500)
        switch(c){
            case 0 : return "post"
            case 1 : return "post error"
            case 2 : return "post copy"
            default : return "post"
        }
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
                                {Data !== 1 ? <>
                                    {Array.from(Data).map(post => (
                                        <div key={"p"+post.id}>  
                                            <div>
                                                <Post post={post} isPost={false} me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild}
                                                setOverlayImages={setOverlayImagesFromChild}/>
                                            </div>
                                            {me ?<div className={colorFunc(postWarningColor)}>
                                                    <CreatePostForm me={me} post={false} parentID={post.id} postID={post.post} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild}
                                                    setOverlayImages={setOverlayImagesFromChild} setColor={setColorFromChild}/>
                                                </div>
                                             :""}                                               
                                            <CommentsPart isPost={false} me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild}/>
                                        </div>
                                    ))}
                                </> : <div>Something went wrong</div>} 
                            </div>
                        {me ? <RightSidebar /> : ""}
                    </div>
                </main>
            </div>
        </>
    )
}

export default CommentPage

