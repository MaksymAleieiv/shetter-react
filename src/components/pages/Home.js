import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import Feed from '../pageComponents/feeds/Feed';
import RightSidebar from '../pageComponents/RightSidebar';
import { useSelector } from 'react-redux'


function Home() {
    document.title = 'Home';
    const overlay = useSelector(state => state.overlay);
    const me = useSelector(state => state.me.me);
    return (
            <>
                <div id='pageWrapper__Overlay' className={!overlay.overlayVisibility ? '' : 'fixed'} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
                    <Header/>
                    <main>
                        <div id='main'>
                            <LeftSidebar/>
                            <Feed urlNum={2}/>
                            { me.id !== -1 ? <RightSidebar/> : '' }
                        </div>
                    </main>
                </div>
            </>
    )
}

export default Home
