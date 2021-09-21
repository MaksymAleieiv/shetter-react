import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Feed from '../pageComponents/feeds/Feed';
import { useSelector } from 'react-redux'

function Subscribtions() {
    document.title = 'Subscriptions'
    const me = useSelector(state => state.me.me);
    const overlay = useSelector(state => state.overlay);
    return (
        <div id='pageWrapper__Overlay' className={!overlay.overlayVisibility ? '' : 'fixed'} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
            <Header/>
            <main>
                <div id='main'>
                    <LeftSidebar/>
                    {me.id !== -1 ? <><Feed urlNum={11} /><RightSidebar /></> : 'Register to get access to this section' }    
                </div>
            </main>
        </div>
    )
}

export default Subscribtions
