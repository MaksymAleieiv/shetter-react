import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Overlay from '../pageComponents/Overlay';
import HotFeed from '../pageComponents/feeds/HotFeed';

import GetMe from '../functions/GetMe';

import { useState } from 'react';

function Hot() {
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [overlayImage, setOverlayImage] = useState({});
    const [overlayImages, setOverlayImages] = useState([]);
    document.title = "Hot"
    
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
                        <HotFeed me={me} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} setOverlayImages={setOverlayImagesFromChild} />
                        {me ? <RightSidebar /> : ""}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Hot
