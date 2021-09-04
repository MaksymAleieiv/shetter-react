import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Feed from '../pageComponents/feeds/Feed';

import GetMe from '../functions/GetMe';
import { useSelector } from 'react-redux';


function Hot() {
    document.title = "Hot"
    const overlay = useSelector(state => state.overlay);

    GetMe();
    return (
        <>
            <div id="pageWrapper__Overlay" className={!overlay.overlayVisibility ? "" : "fixed"} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header/>
                <main>
                    <div id="main">
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
