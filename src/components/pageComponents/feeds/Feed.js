import Post from '../Post';

import { Link } from 'react-router-dom';
import { useState, useCallback, useRef } from 'react';
import CreatePostForm from '../postComponents/CreatePostForm';
import PostsLoader from '../../functions/PostsLoader';

function Feed({me, setOverlayImages, setOverlayVisibility, setOverlayImage}) {
    
    const [startPos, setStartPos] = useState(0);
    const {loading, error, Data, hasMore} = PostsLoader(startPos, 2);

    const observer = useRef();
    const tenthPost = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setStartPos(p => p + 15)
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore])

    const showNewPostsButton = (me) => {
        return me['newPostsCounter'] > 0 ?
            <div id="showNewPostsButton">
                View <span id="newPostsCounter">{me['newPostsCounter']}</span> new Shets
            </div>
            : "";
    }
    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)

    return (
        <div id="feed" className="feed_subscriptions">
            {me !== "" ? 
                <div className={postWarningColor === 0 ? "post" : "post error"}>
                    <CreatePostForm me={me} post={true} setOverlayImage={setOverlayImage} setOverlayImages={setOverlayImages} setOverlayVisibility={setOverlayVisibility} setColor={setColorFromChild}/> 
                </div> 
            : ""}   
            <div id="posts">
                {me !== "" ? showNewPostsButton(me) : ""}
                {error ? <div>An error occured. Possible reasons: You've logged in from another device, servers might've gone down. Try logging out and logging back in.</div> : ""}
                {Array.from(Data).map((post, index) => (
                    <Link key={post.id} to={"/post/" + post.id}>
                        {index === Data.length - 6 ?
                        <div key={post.id} ref={tenthPost}>
                            <Post post={post} isPost={true} setOverlayImage={setOverlayImage} setOverlayVisibility={setOverlayVisibility}
                            setOverlayImages={setOverlayImages} me={me}/>
                        </div>
                        :
                        <div key={post.id} >
                            <Post post={post} me={me} isBookmarked={post.is_booked} isPost={true} setOverlayImage={setOverlayImage} setOverlayVisibility={setOverlayVisibility}
                            setOverlayImages={setOverlayImages}/>
                        </div>
                    }
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Feed