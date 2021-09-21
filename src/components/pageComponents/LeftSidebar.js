import { Link } from 'react-router-dom';

function LeftSidebar() {
    console.log('left sidebar rerendered')

    return (
        <div id='leftSideBar'>
            <nav>
                <li id='Hot_Recent' className={document.title === 'Hot' && 'active'}>
                    <Link id='Hot' to='/hot'>Hot</Link>
                    <div id='Recent'></div>
                </li>
                <li className={document.title === 'Subscriptions' && 'active'}>
                    <Link id='Subscriptions' to='/subscriptions'>Subscriptions</Link>
                </li>
                <li style={{maxHeight: 1, padding: 0}}>
                    <div id='Divider'></div>
                </li>
            </nav>
        </div>
    )
}

export default LeftSidebar

/*
    <Link id='Recent' to='/recent'></Link>

    <li id='Notifications' className={document.title === 'Hotifications' ? 'active' : ''}>
        <Link id='Notifications__inner' to='/notifications'>Notifications</Link>
    </li>
*/
