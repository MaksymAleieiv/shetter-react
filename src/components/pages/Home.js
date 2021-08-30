import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import Feed from '../pageComponents/feeds/Feed';
import RightSidebar from '../pageComponents/RightSidebar';
import Overlay from '../pageComponents/Overlay';

import GetMe from '../functions/GetMe';

import { useState } from 'react';


function Home() {
    document.title = "Home";

    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [overlayImage, setOverlayImage] = useState({});
    const [overlayImages, setOverlayImages] = useState([]);

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
                            <Feed me={me} setOverlayImages={setOverlayImagesFromChild} setOverlayImage={setOverlayImageFromChild} setOverlayVisibility={setOverlayVisibilityFromChild} />
                            {me ? <RightSidebar /> : ""}
                        </div>
                    </main>
                </div>
            </>
    )
}

export default Home
