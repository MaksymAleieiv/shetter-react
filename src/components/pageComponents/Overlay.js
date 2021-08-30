function Overlay({setOverlayImage, setOverlayImages, setOverlayVisibility, overlayImage, overlayImages, overlayVisibility}) {
    return (
        <>
            {overlayVisibility ? 
                <div id="Overlay" style={{minHeight : '100%'}} onClick={() => {
                    const Y = -parseInt(document.getElementById("pageWrapper__Overlay").style.top.slice(0, -2))
                    setOverlayVisibility(false)
                    setOverlayImage({})
                    setOverlayImages([])
                    window.setTimeout(() => window.scrollTo(0, Y), 1)
                        }}>
                
                    {overlayImages.length !== 1 && overlayImage !== 0 ? <button className="bfButton" onClick={e => {
                        e.stopPropagation(); e.preventDefault();
                        if(overlayImage >= 0) setOverlayImage(p => p - 1)
                    }}>{"<"}</button> : ""}
                    
                    <div id="openedImage">
                        <img style={{maxWidth : window.innerWidth - 100}} className="openedImage" src={overlayImages[overlayImage].image} alt="img" onClick={() => window.open(overlayImages[overlayImage].image, '_blank')}></img>
                        <div>{overlayImage}</div>
                    </div>
                    
                    {overlayImages.length !== 1 && overlayImage !== overlayImages.length - 1 ? <button className="bfButton" onClick={e => {
                        e.stopPropagation(); e.preventDefault();
                        if(overlayImage < overlayImages.length) setOverlayImage(p => p + 1)
                    }}>{">"}</button> : ""}

                </div>
            : ""}
        </>
    )
}

export default Overlay
