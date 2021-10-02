import axios from 'axios';

export default function ReglogGoogle(l, t, e, i, n, s) {
    l ? axiosLogin(l, t, e, i, n, s) : axiosRegistration(l, t, e, i, n, s)

    function axiosLogin(l, t, e, i, n, s){
        axios.put('/auth/google/', {
            'id_token' : t,
            'email' : e,
            'provider' : i
        })
        .then(res => {
            window.localStorage.setItem('refresh', JSON.parse(res.request.response).refresh)
            axios({
                method : 'post',
                url : '/token/refresh/',
                data : { 'refresh' : JSON.parse(res.request.response).refresh }
            })
            .then(res => {
                window.localStorage.setItem('access', JSON.parse(res.request.response).access); 
                document.location.reload();
            })
            .catch(err => console.error(JSON.parse(err.request.response)))
        })
        .catch(err => {
            console.error(JSON.parse(err.request.response))
            if(JSON.parse(err.request.response).detail === 'No account with provided data') axiosRegistration(l, t, e, i, n, s)
            else s('Someting went wrong')
        })
    }

    function axiosRegistration(l, t, e, i, n, s){
        axios.post('/auth/google/', {
            'id_token' : t,
            'email' : e,
            'username' : n,
            'provider' : i
        })
        .then(() => {
            axiosLogin(l, t, e, i, n, s)
        })
        .catch(err => {
            console.error(JSON.parse(err.request.response))
            if(JSON.parse(err.request.response).detail === 'User with this id_token already exists') axiosLogin(l, t, e, i, n, s)
            if(JSON.parse(err.request.response).detail === 'User with this email already exists') s('You already have an account')
        })
    }
}
