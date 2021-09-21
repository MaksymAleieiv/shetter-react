import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import SettingsFeed from '../pageComponents/feeds/SettingsFeed'
import { useSelector } from 'react-redux'


function Settings() {
    document.title = 'Settings';
    const me = useSelector(state => state.me.me);
    return (
        <>
            <div id='pageWrapper__Overlay'>
                <Header/>
                <main>
                    <div id='main'>
                        <LeftSidebar />
                        <SettingsFeed  />
                        {me.id !== -1 && <RightSidebar />}
                    </div>
                </main>
            </div>      
        </>
    )
}

export default Settings
