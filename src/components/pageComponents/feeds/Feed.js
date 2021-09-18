import Post from '../Post';

import { Link } from 'react-router-dom';
import { useState, useCallback, useRef, useEffect } from 'react';
import CreatePostForm from '../postComponents/CreatePostForm';
import PostsLoader from '../../functions/PostsLoader';
import { useSelector, useDispatch } from 'react-redux'
import NewPostsButton from '../NewPostsButton';
import { deletePost_Action } from '../../../store/postReducer'
import { clearSelected_Action } from '../../../store/selectedPostsReducer';
import { store } from '../../../store/index_Reducer'
import axios from 'axios';

function Feed({urlNum}) {
    console.log('feed rerendered')
    const dispatch = useDispatch()
    
    const [startPos, setStartPos] = useState(0);
    const {loading, error, hasMore} = PostsLoader(startPos, urlNum);

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

    const showText = () => {
        if(loading) return 'Loading...'
        if(error) return 'An error occured. Possible reasons: You\'ve logged in from another device, servers might\'ve gone down. Try logging out and logging back in.'
        if(posts.length === 0) return 'Nothing to show'
    } 
    useEffect(() => {
        const deleteSelected = (e) => {
            if(e.keyCode === 46){
                const deletePost = async (post, id) => {
                    console.log(post)
                    await axios({
                        method : 'delete',
                        url :  post ? '/api/v1/posts/' + id : '/api/v1/comments/' + id
                    })
                    .then(() => {
                        dispatch( deletePost_Action(id) )
                    })
                    .catch(e => {})
                }
                const selectedPosts = store.getState().selected
                console.log(selectedPosts.comments)
                try{
                    selectedPosts.comments.forEach(id => {
                        deletePost(false, id)
                    })
                    selectedPosts.posts.forEach(id => {
                        deletePost(true, id)
                    })
                } finally {
                    dispatch( clearSelected_Action() )
                }
            }
        }
        const cancelSelection = () => {   
            dispatch( clearSelected_Action() )
        }
        document.addEventListener('keydown', deleteSelected)
        document.addEventListener('click', cancelSelection)
        return () => {
            document.removeEventListener('keydown', deleteSelected)
            document.removeEventListener('click', cancelSelection)
        }
    }, [])

    return (
        <div id='feed' className='feed_subscriptions'>        
            {me.id !== -1 && document.title === 'Home' ? 
                <div id='post-create-form' className={postWarningColor === 0 ? 'post' : 'post error'}>
                    <CreatePostForm me={me} post={true} setColor={setColorFromChild} lastPostID={posts[0] !== undefined ? posts[0]['id'] : 0}/> 
                </div> 
            : ''}
            {urlNum === 2 ? <NewPostsButton lastID={posts[0]}/> : ''}
            <div id='posts'>
                {Array.from(posts).map((post, index) => (
                    <Link key={'l' + post.id} to={post.parent === undefined ? '/post/' + post.id : '/comment/' + post.id }>
                        {index === posts.length - 6 ?
                        <div key={'p' + post.id} ref={tenthPost}>
                            <Post post={post} isPost={post.parent === undefined}  me={me}/>
                        </div>
                        :
                        <div key={'p' + post.id} >
                            <Post post={post} me={me} isBookmarked={post.is_booked} isPost={post.parent === undefined} />
                        </div>
                    }
                    </Link>
                ))}
                {showText()}
            </div>

        </div>
    )
}

export default Feed
