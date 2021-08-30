import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import SettingsFeed from '../pageComponents/feeds/SettingsFeed'

import GetMe from '../functions/GetMe';

import { useState } from 'react';

function Settings() {
    document.title = "Settings";
    const [u,setU] = useState(1)
    const setUFromChild = (h) => setU(h)
    const {me} = GetMe(u);
    return (
        <>
            {me !== "" ? 
                <div id="pageWrapper__Overlay">
                <Header me={me}/>
                <main>
                    <div id="main">
                            <LeftSidebar me={me}/>
                            <SettingsFeed me={me} setU={setUFromChild} />
                            {me ? <RightSidebar /> : ""}
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
