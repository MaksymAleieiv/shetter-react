import logoSVG from '../images/Logo.svg';
import searchSVG from '../images/Search.svg';
import ProfilePartHeader from '../pageComponents/ProfilePartHeader';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CreatePostForm from './postComponents/CreatePostForm';
import { useDispatch } from 'react-redux'
import { render, unmountComponentAtNode } from 'react-dom';
import { Link } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch()
    const me = useSelector(state => state.me.me);
    const keyListener = () => {
        function Search(e){
            if(e.keyCode === 13) alert(document.getElementById('searchInput').value)
            document.removeEventListener('keydown', Search)
        }
        document.addEventListener('keydown', Search)
    }
    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)
    const openCreateForm = () => { 
        const portal = document.getElementById('portal');
        console.log(portal)
        dispatch({type : "CHANGE_DATA__OVERLAY", payload : {
            overlayVisibility : true,
            overlayImage : 0,
            overlayImages : []
        }})
        render(
            <div id="Overlay" style={{minHeight : '100%'}} onClick={() => {
                const Y = -parseInt(document.getElementById("pageWrapper__Overlay").style.top.slice(0, -2))
                dispatch({type : "CLEAR_OVERLAY"})
                console.log(portal.firstChild)
                unmountComponentAtNode(portal)
                window.setTimeout(() => window.scrollTo(0, Y), 1)
            }}>
                <div id="create" className={postWarningColor === 0 ? "post" : "post error"}>
                    <CreatePostForm me={me} post={true} setColor={setColorFromChild}/> 
                </div> 
            </div>,
            portal
        )
    }
    return (
        <header>
            <ul>
                <Link id="Logo" to="/" onClick={() => window.scrollTo(0,0)}>
                    <img src={logoSVG} alt="img" />
                </Link>
                <li id="search">
                    <label>
                        <button id="searchButton">
                            <img src={searchSVG} alt="img" />
                        </button>
                        <input id="searchInput" type="search" placeholder="Search..." onChange={keyListener}></input>
                    </label>
                </li>
                <li id="newPost">
                    {me.id !== -1 ? 
                        <button id="cnpb_s" onClick={openCreateForm}>
                            New Shet
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.99967 10.6667V6.00004M5.99967 6.00004V1.33337M5.99967 6.00004H10.6663M5.99967 6.00004H1.33301" stroke="#524872" strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>               
                        </button>
                    : ""}
                </li>
                <ProfilePartHeader me={me}/>
            </ul>
        </header>
    )
}

export default Header
