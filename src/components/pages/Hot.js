import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Feed from '../pageComponents/feeds/Feed';

import { getMe } from '../../store/getMeAction';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';


function Hot() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch( getMe() )
    }, [])
    document.title = 'Hot'
    const overlay = useSelector(state => state.overlay);

    return (
        <>
            <div id='pageWrapper__Overlay' className={!overlay.overlayVisibility ? '' : 'fixed'} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header/>
                <main>
                    <div id='main'>
                        <LeftSidebar/>
                        <Feed urlNum={10}/>
                        <RightSidebar />
                    </div>
                </main>
            </div>
        </>
    )
}

export default Hot
