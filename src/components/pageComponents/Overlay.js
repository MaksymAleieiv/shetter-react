import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function Overlay() {
    const dispatch = useDispatch();
    const overlay = useSelector(state => state.overlay);
    return (
        <>
            {overlay.overlayVisibility ? 
                <div id="Overlay" style={{minHeight : '100%'}} onClick={() => {
                    const Y = -parseInt(document.getElementById("pageWrapper__Overlay").style.top.slice(0, -2))
                    dispatch({type : "CLEAR_OVERLAY"})
                    window.setTimeout(() => window.scrollTo(0, Y), 1)
                        }}>
                
                    {overlay.overlayImages.length !== 1 && overlay.overlayImage !== 0 ? <button className="bfButton" onClick={e => {
                        e.stopPropagation(); e.preventDefault();
                        if(overlay.overlayImage >= 0){
                            dispatch({type : "PREV_IMAGE"})
                        }
                    }}>{"<"}</button> : ""}
                    
                    <div id="openedImage">
                        <img style={{maxWidth : window.innerWidth - 100}} className="openedImage" src={overlay.overlayImages[overlay.overlayImage].image ? overlay.overlayImages[overlay.overlayImage].image : overlay.overlayImages[overlay.overlayImage]}
                        alt="img" onClick={() => window.open(overlay.overlayImages[overlay.overlayImage].image ? overlay.overlayImages[overlay.overlayImage].image : overlay.overlayImages[overlay.overlayImage], '_blank')}></img>
                        <div>{overlay.overlayImage}</div>
                    </div>
                    
                    {overlay.overlayImages.length !== 1 && overlay.overlayImage !== overlay.overlayImages.length - 1 ? <button className="bfButton" onClick={e => {
                        e.stopPropagation(); e.preventDefault();
                        if(overlay.overlayImage < overlay.overlayImages.length){
                            dispatch({type : "NEXT_IMAGE"})
                        }
                    }}>{">"}</button> : ""}

                </div>
            : ""}
        </>
    )
}

export default Overlay
