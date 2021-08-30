
import Post from '../Post';
import { useState, useCallback, useRef } from 'react';
import PostsLoader from '../../functions/PostsLoader';
import { Link } from 'react-router-dom';

function CommentsPart({setOverlayImage, setOverlayVisibility, me, isPost}) {
    const [startPos, setStartPos] = useState(0);
    const {loading, error, Data, hasMore} = PostsLoader(startPos, isPost ? 3 : 9);

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
        <>
            {error ? <div>An error occured. Possible reasons: You've logged in from another device, servers might've gone down. Try logging out and logging back in.</div> : ""}
            {Data.map(comment => 
                <div key={"c"+comment.id} className="commentToPost post" id={"comment_" + comment.id} ref={tenthPost} >
                    <Link key={comment.id} to={"/comment/" + comment.id}>
                        <Post post={comment} isPost={false} parentID={comment.post} me={me} setOverlayImage={setOverlayImage} setOverlayVisibility={setOverlayVisibility} />
                    </Link>
                </div>
            )}
        </>
    )
}

export default CommentsPart
