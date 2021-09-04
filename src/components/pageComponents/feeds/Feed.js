import Post from '../Post';

import { Link } from 'react-router-dom';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import CreatePostForm from '../postComponents/CreatePostForm';
import PostsLoader from '../../functions/PostsLoader';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';

function Feed({urlNum}) {
    const dispatch = useDispatch()
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        if(urlNum === 2){
            const interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000 * 30);
            return () => clearInterval(interval);
        }
    }, [])
    const [startPos, setStartPos] = useState(0);
    const {loading, error, hasMore} = PostsLoader(startPos, urlNum);
    const { username } = useParams();

    const me = useSelector(state => state.me.me);
    const posts = useSelector(state => state.posts.posts)

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

    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)

    const showNewPostsButton = (k) => {
        const b = document.getElementById('b')
        if(k != 0){
            const getNewPosts = (i) => {
                axios.get("/api/v1/posts/?startpos="+0+"&endpos="+i)
                .then((res) => {
                    unmountComponentAtNode(b)
                    dispatch({type : "ADD_POSTS_AT_FRONT", payload : res.data})
                })
            }
            if(urlNum === 2)
                axios.post('/api/v1/posts/listener/', {
                    'last_id' : posts[0]['id']+''
                }).then((res) => {
                    const np = res.data.new_posts;
                    if (np > 0)
                        render(
                            <button id="showNewPostsButton" className="post" onClick={() => getNewPosts(np)}>
                                View <span id="newPostsCounter">{np}</span> new Shets
                            </button>, b)
                })
                .catch(err => console.log(err.response))
        }
    }
    const showText = () => {
        if(loading) return "Loading..."
        if(error) return "An error occured. Possible reasons: You've logged in from another device, servers might've gone down. Try logging out and logging back in."
        if(posts.length === 0) return "Nothing to show"
    } 
    return (
        <div id="feed" className="feed_subscriptions">          
            {showNewPostsButton(seconds)}
            {me.id !== -1 && document.title === "Home" ? 
                <div id="post-create-form" className={postWarningColor === 0 ? "post" : "post error"}>
                    <CreatePostForm me={me} post={true} setColor={setColorFromChild} lastPostID={posts[0] !== undefined ? posts[0]['id'] : 0}/> 
                </div> 
            : ""}
            <div id="b"></div>
            <div id="posts">
                {showText()}
                {Array.from(posts).map((post, index) => (
                    <Link key={post.id} to={post.parent === undefined ? "/post/" + post.id : "/comment/" + post.id }>
                        {index === posts.length - 6 ?
                        <div key={post.id} ref={tenthPost}>
                            <Post post={post} isPost={true}  me={me}/>
                        </div>
                        :
                        <div key={post.id} >
                            <Post post={post} me={me} isBookmarked={post.is_booked} isPost={true} />
                        </div>
                    }
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Feed
