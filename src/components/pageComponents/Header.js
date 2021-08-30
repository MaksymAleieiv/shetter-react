import logoSVG from '../images/Logo.svg';
import searchSVG from '../images/Search.svg';
import ProfilePartHeader from '../pageComponents/ProfilePartHeader';

import { Link } from 'react-router-dom';

function Header({me}) {
    const keyListener = () => {
        function Search(e){
            if(e.keyCode === 13) alert(document.getElementById('searchInput').value)
            document.removeEventListener('keydown', Search)
        }
        document.addEventListener('keydown', Search)
    }
    return (
        <header>
            <ul>
                <Link id="Logo" to="/">
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
                    <button id="cnpb_s">
                            New Shet
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.99967 10.6667V6.00004M5.99967 6.00004V1.33337M5.99967 6.00004H10.6663M5.99967 6.00004H1.33301" stroke="#524872" strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>               
                    </button>
                </li>
                <ProfilePartHeader me={me}/>
            </ul>
        </header>
    )
}

export default Header
