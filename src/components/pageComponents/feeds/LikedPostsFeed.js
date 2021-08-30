import { useState, useRef, useCallback } from 'react'
import PostsLoader from '../../functions/PostsLoader';
import Post from '../Post';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

function ShetsUserPage({me, setOverlayImage, setOverlayVisibility, setOverlayImages, book}) {
    const { username } = useParams();
    const [startPos, setStartPos] = useState(0);
    const setStartPosfromChild = (startPosFromChild) =>{
        setStartPos(startPosFromChild)
    }
    const {loading, error, Data, hasMore} = PostsLoader(startPos, book ? 5 : 4, setStartPosfromChild, username);
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
            {Data.length === 0 ? <div>This user hasn't liked anything yet</div> :""}
            {error ? <div>An error occured. Possible reasons: You've logged in from another device, servers might've gone down. Try logging out and logging back in.</div> : ""}
            {Array.from(Data).map((post,index) => 
                <Link key={"l"+post.id} to={"/post/" + post.id}>
                    {index === Data.length - 6 ?
                    <div ref={tenthPost}>
                        <Post post={post} isPost={true} me={me} setOverlayImage={setOverlayImage} setOverlayVisibility={setOverlayVisibility}
                        setOverlayImages={setOverlayImages}/>
                    </div>
                    :
                    <div>
                        <Post post={post} isPost={true} me={me} setOverlayImage={setOverlayImage} setOverlayVisibility={setOverlayVisibility}
                        setOverlayImages={setOverlayImages}/>
                    </div>
                }
                </Link>
            )}
        </>
    )
}

export default ShetsUserPage
