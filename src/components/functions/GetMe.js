import axios from 'axios';
import { useState, useEffect } from 'react';

export default function GetMe(u = null) {
    const [me, setMe] = useState("");
    const access = window.localStorage.getItem("access");
    if(access) {
        setInterval(() => {
            axios({
                method : 'post',
                url : '/token/refresh/',
                data : { 'refresh' : window.localStorage.getItem('refresh') }
            })
            .then(res => {window.localStorage.setItem('access', JSON.parse(res.request.response).access)})
        }, (1000 * 60 * 10))
    }
    useEffect(() => {
        const getMeData = async () => {
            const Me = await getMe();
            if(Me !== ""){
                setMe(Me.data)
                sessionStorage.setItem('me', JSON.stringify(Me.data))
            }
        }
        if(access)getMeData()
    }, [u])
    const getMe = async () => {
        if(access) {
            if(sessionStorage.getItem('me') && u === 1){
                setMe(JSON.parse(sessionStorage.getItem('me')))
                return "";
            }else{
                try{
                    const res = await axios.get("/auth/users/me",{});
                    const me = await res;
                    return me;
                }catch(err){
                    if(JSON.parse(err.request.response).detail === "Given token not valid for any token type"){
                        window.localStorage.removeItem('access');
                        window.localStorage.removeItem('refresh');
                        window.sessionStorage.removeItem('me');
                        document.location.reload()
                        return ""
                    }
                }
            }
        }
        else setMe("")
    }
    return {me}
}
