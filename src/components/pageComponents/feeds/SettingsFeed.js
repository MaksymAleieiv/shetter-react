
import { useState, useEffect } from 'react'
import axios from 'axios';
import FastAverageColor from 'fast-average-color'
import { useDispatch, useSelector } from 'react-redux'
import errorImgPNG from '../../images/errorImg.png'

function SettingsFeed() {
    const dispatch = useDispatch()
    const me = useSelector(state => state.me.me)
    const [firstName, setFirstName] = useState(me.first_name)
    const [lastName, setLastName] = useState(me.first_name)
    const [bio, setBio] = useState(me.first_name)
    const [profilePhoto, setProfilePhoto] = useState('')
    const [profilePhotoBlob, setProfilePhotoBlob] = useState('')
    useEffect(() => {
        if( me.id !== -1 ){
            setFirstName(me.first_name)
            setLastName(me.last_name)
            setBio(me.bio)
            setProfilePhoto(me.profile_photo)
            setProfilePhotoBlob(me.profile_photo)
        }
    }, [me])
    const access = window.localStorage.getItem('access');
    if(access) axios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
    const getMeData = async () => {
        const Me = await getMe();
        if(Me !== ''){
            dispatch({type : 'CHANGE_DATA', payload : Me.data})
        }
    }
    const getMe = async () => {
        try{
            const res = await axios.get('/auth/users/me',{});
            const me = await res;
            return me;
        }catch(err){
            if(JSON.parse(err.request.response).detail === 'Given token not valid for any token type'){
                window.localStorage.removeItem('access');
                window.localStorage.removeItem('refresh');
                dispatch({type : 'CLEAR_ME'})
                document.location.reload()
                return ''
            }
        }
    }
    
    const changeSettings = () => {
        if(!(me.first_name === firstName && me.last_name === lastName && me.bio === bio && profilePhoto === profilePhotoBlob)){
            if(!(me.first_name === firstName && me.last_name === lastName && me.bio === bio)){
                axios.put('/api/v1/user_data/', {
                    'first_name': firstName,
                    'last_name': lastName,
                    'bio': bio
                })
                .then(() => {
                    setColor(2)
                    getMeData()
                })
                .catch(response => {
                    const res = response
                    console.log(res)
                })
           }
            if(profilePhoto !== profilePhotoBlob){
                const formData = new FormData();
                formData.append('photo', profilePhoto)
                axios.post('/api/v1/profile_photo/', formData, {headers :
                    {
                        'Authorization' : 'Bearer ' + window.localStorage.getItem('access'),
                        'Content-Type' : 'multipart/form-data'
                    }})
                .then(() => {
                    setColor(2);
                    getMeData()
                })
                .catch(response => {
                    const res = JSON.parse(response.request.response)
                    console.log(res)
                })
            }

        }else setColor(1)
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
    const handleInput = (event) => {
        setProfilePhoto(event.target.files[0]);
        setProfilePhotoBlob(URL.createObjectURL(event.target.files[0]))
    }
    const [postWarningColor, setColor] = useState(0);
    const colorFunc = (c) => {
        if(postWarningColor !== 0)setTimeout(() => setColor(0), 500)
        switch(c){
            case 0 : return 'settings'
            case 1 : return 'settings error'
            case 2 : return 'settings copy'
            default : return 'settings'
        }
    }

    return (
        <div id='feed' className='feed_subscriptions'>
            {getAverageRGB(profilePhotoBlob)}
            <div className={colorFunc(postWarningColor)}>
                <div className='settingsTitle'>Settings</div>
                <div className='userBackground settings' style={{backgroundColor : averageColor}}><button className='changeBackgroundPhoto'></button></div>
                <div className='userAvatar settings'>
                    <img src={ profilePhotoBlob } onError={(e)=>{e.target.onerror = null; e.target.src=errorImgPNG}} alt='avatar' />
                    <label className='changeProfilePhoto'>
                        <input accept='image/jpg, image/jpeg, image/png' type='file' className='addImageInput'
                        onClick={(event) => event.target.value = null} onChange={handleInput} /> 
                    </label>
                </div>
                <div className='settingsFormForm'>
                <div>
                    <label>First Name</label><br />
                    <input type='text' value={firstName} onChange={e => {
                        setFirstName(e.target.value)
                    }} className='settingsForm formInput' maxLength='15' /><br />
                </div>
                <div>
                    <label>Last Name</label><br />
                    <input  type='text' value={lastName} onChange={e => {
                        setLastName(e.target.value)
                    }} className='settingsForm formInput' maxLength='15' /><br />
                </div>
                <div>
                    <label>Bio</label><br />
                    <textarea  type='text' value={bio} onChange={e => {
                        setBio(e.target.value)
                    }} className='settingsForm formInput fat' maxLength='200' /><br />
                </div>
                <button id='subSetBut' className='settingsForm submit' type='submit' onClick={changeSettings}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsFeed
