import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Feed from '../pageComponents/feeds/Feed';
import { useEffect } from 'react';

import { getMe } from '../../store/getMeAction';
import { useSelector, useDispatch } from 'react-redux'

function Subscribtions() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch( getMe() )
    }, [])
    document.title = 'Subscriptions'
    const me = useSelector(state => state.me.me);
    const overlay = useSelector(state => state.overlay);
    return (me.id !== -1 ?
        <>
            <div id='pageWrapper__Overlay' className={!overlay.overlayVisibility ? '' : 'fixed'} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header/>
                <main>
                    <div id='main'>
                        <LeftSidebar/>
                        <Feed urlNum={11} />                        
                        <RightSidebar />
                    </div>
                </main>
            </div>
        </>
        :
        'Register to get access to this section'
    )
}

export default Subscribtions
