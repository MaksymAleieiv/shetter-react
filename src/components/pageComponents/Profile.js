import PostSettings from './postComponents/PostSettings';
import { useState } from 'react';
import FastAverageColor from 'fast-average-color'
import axios from 'axios';
import { useSelector } from 'react-redux'
import errorImgPNG from '../images/errorImg.png'
import { Link } from 'react-router-dom';

function Profile({userData, setShetsVisibility, shetsVisibility}) {
    const me = useSelector(state => state.me.me);
    const getName = (authorUsername, firstName, lastName) => {
        if(firstName === '' && lastName === '') return authorUsername;
        if(firstName !== '' && lastName === '') return firstName;
        if(firstName === '' && lastName !== '') return lastName;
        if(firstName && lastName) return firstName + ' ' + lastName;
    }
    const [settingVisibility, setSettingVisibility] = useState(false);
    const setSettingVisibilityFromChild = (c) => setSettingVisibility(c);
    const [isSubscribed, setSubscribed] = useState(userData.is_subscribed);
    if(isSubscribed === undefined) setTimeout(() => {setSubscribed(userData.is_subscribed)}, 1)

    const [notificationsSub, setNotificationsSub] = useState(false);
    const Subscribe = () => {
        setSubscribed(p => !p)
        axios.post('api/v1/subscribe/' + userData.username)
        .catch(err => console.log(err))
    }
    const SubscribeToNotifications = () => {
        console.log(userData)
        setNotificationsSub(p => !p)
    }

    const closeSettingsListener = () => {
        function closeSettings(){
            setSettingVisibility(false);
            window.removeEventListener('click', closeSettings)
        }
        window.addEventListener('click', closeSettings)
    }

    const [averageColor, setAverageColor] = useState();
    function getAverageRGB(img) {
        const fac = new FastAverageColor();
        fac.getColorAsync(img)
            .then(color => {
                setAverageColor(color.rgb)
                return color.rgb
            })
            .catch(e => {});
    }
    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)
    const colorFunc = (c) => {
        if(postWarningColor !== 0) setTimeout(() => setColor(0), 500)
        switch(c){
            case 0 : return ''
            case 2 : return 'copy'
            default : return ''
        }
    }
    const profileHeightFunc = (c) => {
        if(c.length === 0) return 'h170'
        if(c.length <= 98) return 'h205'
        if(c.length > 98 && c.length <= 188) return 'h220'
        if(c.length > 188) return 'h240'
    }
    return (
        <div id='ProfilePage'>
            <div id='userInfo'>
                <div className='userBackground' style={{backgroundColor : averageColor}}>
                    <div className='userAvatar'>
                        {getAverageRGB(userData.profile_photo)}
                        <img src={ userData.profile_photo } onError={(e)=>{e.target.onerror = null; e.target.src=errorImgPNG; getAverageRGB(errorImgPNG)}} alt=''/>
                    </div>
                </div>
                <div className={colorFunc(postWarningColor)} id={userData.bio !== undefined ? profileHeightFunc(userData.bio) : ''}>                    
                    {me && me.username !== userData.username ?
                        <div className={isSubscribed ? 'settingsForThisUser' : 'settingsForThisUser long'}>
                            <button className='userSettingsButton' onClick={e => {e.stopPropagation(); e.preventDefault(); closeSettingsListener(); setSettingVisibility(p => !p)}}>···</button>
                            <button onClick={SubscribeToNotifications} className={notificationsSub ? 'setNotificationsButton sub' : 'setNotificationsButton notsub'}><i></i></button>
                            {isSubscribed ? 
                                <button onClick={Subscribe} className='subscribeButton sub'><i></i></button>
                            :
                                <button onClick={Subscribe} className='subscribeButton notsub'><span>Follow</span></button>
                            }
                        </div>
                    : 
                        <div className='settingsForThisUser short'>
                            <Link to='/settings' className='goToSettings' ><i></i></Link>
                            <button className='userSettingsButton' onClick={e => {e.stopPropagation(); e.preventDefault(); closeSettingsListener(); setSettingVisibility(p => !p)}}>···</button>
                        </div>
                    }
                    <div id='userInfo__Info'>
                        <span className='Username__userProfile'>{getName(userData.username, userData.first_name, userData.last_name)}</span> <span className='tag tag__userProfile'>@{userData.username}</span>
                        <div id='userStatus'>{userData.bio}</div>
                        <div id='userFollowInfo'>
                            <span className='__bold'>{userData.following_count}</span>
                            <span className='cf'> Following</span>
                            <span className='__bold ml16'>{userData.followers_count}</span>
                            <span className='cf'> Followers</span>
                        </div>
                    </div>
                    <div className='profileControlButtons'>
                        <button onClick={() => setShetsVisibility(0)} className={shetsVisibility === 0 ? 'active' : ''}>Shets <span className='cf c'>{userData.user_posts_count}</span></button>
                        <button onClick={() => setShetsVisibility(1)} className={shetsVisibility === 1 ? 'active' : ''}>Replies <span className='cf c'>{userData.user_comments_count}</span></button>
                        <button onClick={() => setShetsVisibility(2)} className={shetsVisibility === 2 ? 'active' : ''}>Likes 
                            <span className='cf c'>{userData.user_post_likes_count !== undefined ? userData.user_post_likes_count + userData.user_comment_likes_count : ''}</span>
                        </button>
                    </div>
                </div>
            </div>
            {settingVisibility ? 
                <PostSettings myUsername={me.username} username={userData.username} userProfileSettings={true} setSettingVisibility={setSettingVisibilityFromChild} setColor={setColorFromChild}/>
            :''}
        </div>
    )
}

export default Profile
