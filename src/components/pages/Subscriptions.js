import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import SubscriptionsFeed from '../pageComponents/feeds/SubscriptionsFeed';
import Overlay from '../pageComponents/Overlay';

import GetMe from '../functions/GetMe';
import { useState } from 'react';

function Subscribtions() {
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [overlayImage, setOverlayImage] = useState({});
    const [overlayImages, setOverlayImages] = useState([]);
    document.title = "Subscriptions"
   
    const setOverlayImagesFromChild = (c) => setOverlayImages(c)
    const setOverlayImageFromChild = (c) => setOverlayImage(c)
    const setOverlayVisibilityFromChild = (c) => setOverlayVisibility(c)
    
    const {me} = GetMe();
    return (
        <>
            <Overlay setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImage={setOverlayImageFromChild} setOverlayImages={setOverlayImagesFromChild}
            overlayVisibility={overlayVisibility} overlayImage={overlayImage} overlayImages={overlayImages}/>
            <div id="pageWrapper__Overlay" className={!overlayVisibility ? "" : "fixed"} style={!overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header me={me}/>
                <main>
                    <div id="main">
                        <LeftSidebar me={me}/>
                        <SubscriptionsFeed me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild} />                        
                        {me ? <RightSidebar /> : ""}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Subscribtions
