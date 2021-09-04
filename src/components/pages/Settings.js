import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import SettingsFeed from '../pageComponents/feeds/SettingsFeed'

import GetMe from '../functions/GetMe';
import { useSelector } from 'react-redux';


function Settings() {
    document.title = "Settings";
    const me = useSelector(state => state.me.me);
    GetMe();
    return (
        <>
            {me.id !== -1 ? 
                <div id="pageWrapper__Overlay">
                    <Header/>
                    <main>
                        <div id="main">
                            <LeftSidebar />
                            <SettingsFeed  />
                            <RightSidebar />
                        </div>
                    </main>
                </div>
            :
                () => {document.location = "/registration"}
            }       
        </>
    )
}

export default Settings
