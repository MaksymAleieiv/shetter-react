import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import { useState, useEffect } from 'react';
import Feed from '../pageComponents/feeds/Feed';

import { getMe } from '../../store/getMeAction';
import { useSelector, useDispatch } from 'react-redux'

function Bookmarks() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch( getMe() )
    }, [])
    document.title = 'Bookmarks'
    const overlay = useSelector(state => state.overlay);
    const me = useSelector(state => state.me.me);

    const [shetsBookmarksVisibility, setShetsBookmarksVisibility] = useState(true);
    

    const setFeed = () => {
        if(shetsBookmarksVisibility) return (
            <>
                <div id='userPageLikes__buttons'>
                    <button onClick={() => setShetsBookmarksVisibility(true)} className={shetsBookmarksVisibility ? 'active' : ''}>Shets</button>
                    <button onClick={() => setShetsBookmarksVisibility(false)} className={!shetsBookmarksVisibility ? 'active' : ''}>Replies</button>
                </div>
                <div>
                    <Feed urlNum={5}/>
                </div>
            </>
        )
        else return (
            <>
                <div id='userPageLikes__buttons'>
                    <button onClick={() => setShetsBookmarksVisibility(true)} className={shetsBookmarksVisibility ? 'active' : ''}>Shets</button>
                    <button onClick={() => setShetsBookmarksVisibility(false)} className={!shetsBookmarksVisibility ? 'active' : ''}>Replies</button>
                </div>
                <div>
                    <Feed urlNum={13}/>
                </div>
            </>
        )
    }
    return (me.id !== -1 ?
        <>
            <div id='pageWrapper__Overlay' className={!overlay.overlayVisibility ? '' : 'fixed'} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header/>
                <main>
                    <div id='main'>
                        <LeftSidebar/>
                        <div id='feed' className='feed_subscriptions'> 
                            <div id='posts'>
                                {setFeed()}
                            </div>
                        </div>
                        <RightSidebar />
                    </div>
                </main>
            </div>
        </>
        : ''
    )
}

export default Bookmarks
