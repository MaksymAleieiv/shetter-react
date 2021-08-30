import Post from '../Post';

import { Link } from 'react-router-dom';
import { useState, useCallback, useRef } from 'react';
import PostsLoader from '../../functions/PostsLoader';

function SubscriptionsFeed({me, setOverlayImages, setOverlayVisibility, setOverlayImage}) {
    const [startPos, setStartPos] = useState(0);
    const {loading, error, Data, hasMore} = PostsLoader(startPos, 11, me.username);

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
    return (
        <div id="feed" className="feed_subscriptions"> 
            <div id="posts">
                { Data === 1 ? <div>You haven't subscribed to anyone yet</div> :""}
                {error ? <div>An error occured. Possible reasons: You've logged in from another device, servers might've gone down. Try logging out and logging back in.</div> : ""}
                {Array.from(Data).map((post, index) => (
                    <Link key={post.id} to={"/post/" + post.id}>
                        {index === Data.length - 6 ?
                        <div key={post.id} className="post" id={"post_" + post.id} ref={tenthPost}>
                            <Post post={post} isPost={true} me={me} setOverlayImage={setOverlayImage} setOverlayImages={setOverlayImages} setOverlayVisibility={setOverlayVisibility}/>
                        </div>
                        :
                        <div key={post.id} className="post" id={"post_" + post.id} >
                            <Post post={post} isPost={true} me={me} setOverlayImage={setOverlayImage} setOverlayImages={setOverlayImages} setOverlayVisibility={setOverlayVisibility}/>
                        </div>
                    }
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SubscriptionsFeed