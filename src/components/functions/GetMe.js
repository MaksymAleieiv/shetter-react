import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function GetMe() {
    const dispatch = useDispatch();
    const access = window.localStorage.getItem("access");
    useEffect(() => {
        if(access){
            axios.defaults.headers.common['Authorization'] = "Bearer " + access;
            getMeData();
        }
    }, [])
    
    const getMeData = async () => {
        const Me = await getMe();
        if(Me !== ""){
            dispatch({type : "CHANGE_DATA", payload : Me.data})
        }
    }
    const getMe = async () => {
        try{
            const res = await axios.get("/auth/users/me",{});
            const me = await res;
            return me;
        }catch(err){
            if(JSON.parse(err.request.response).detail === "Given token not valid for any token type"){
                console.log(window.localStorage.getItem('access'))
                console.log(window.localStorage.getItem('refresh'))
                alert("token error")
                window.localStorage.removeItem('access');
                window.localStorage.removeItem('refresh');
                dispatch({type : "CLEAR_ME"})
                document.location.reload()
                return ""
            }
        }
    }
}
