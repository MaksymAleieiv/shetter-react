import { useState, useEffect } from 'react'
import { useParams } from 'react-router';

import axios from 'axios';

export default function PostsLoader(startPos, page, setStartPos = null, Username = null) {
    const access = window.localStorage.getItem("access");
    if(access) axios.defaults.headers.common['Authorization'] = "Bearer " + access;
    const { username } = useParams();
    const { comment_id } = useParams()
    const [prevUser, setPrevUser] = useState("");
    const { post_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [Data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        let cancel;
        let url;
        switch(page){
            case 1  :url = "/api/v1/posts/?startpos="+startPos+"&endpos="+(startPos+15)+"&username="+username; break;
            case 2 : url = "/api/v1/posts/?startpos="+startPos+"&endpos="+(startPos+15); break;
            case 3 : url = "/api/v1/comments/?post_id="+post_id+"&parent_id=null&startpos="+startPos+"&endpos="+(startPos+15); break;
            case 4 : url = "/api/v1/posts/?startpos="+startPos+"&endpos="+(startPos+15)+"&liked_by="+username; break;
            case 5 : url = "/api/v1/posts/my_bookmarks/?startpos="+startPos+"&endpos="+(startPos+15); break;
            case 6 : url = "/api/v1/posts/" + startPos; break
            case 7 : url = "/users/" + username; break
            case 8 : url = "/api/v1/comments/" + startPos; break;
            case 9 : url = "/api/v1/comments/?parent_id=" + comment_id; break;
            case 10 : url = "/api/v1/posts/hot/"; break;
            case 11 : url = "/api/v1/my_subscriptions/?startpos="+startPos+"&endpos="+(startPos+15);; break;
            case 12 : url = "/api/v1/comments/?startpos="+startPos+"&endpos="+(startPos+15)+"&liked_by="+username; break;
            case 13 : url = "/api/v1/comments/my_bookmarks/?startpos="+startPos+"&endpos="+(startPos+15); break;
            case 14 : url = "/api/v1/comments/?startpos="+startPos+"&endpos="+(startPos+15)+"&username="+username; break;
            default : break;
        }
        setLoading(true);
        setError(false);
        axios({
            method : 'get',
            url : url,
            headers : {},
            cancelToken : new axios.CancelToken(c => cancel = c)
        })
        .then(res => {
            setData(p => {
                function f(data, key){
                    return [
                        ...new Map(
                            data.map(x => [key(x), x])
                        ).values()
                    ]
                }
                if(page === 6 || page === 8) return [res.data]
                if(Username !== null && prevUser !== "" && prevUser !== username){setStartPos(0); return [...res.data]}
                if(page === 10) {
                    return f([...p, ...res.data], i => i.id)
                }
                return [...p, ...res.data]
            })
            setHasMore(res.data.length === 15)
            setPrevUser(username)
            setLoading(false);
        })
        .catch(err => {
            setError(true)
            if(err.request)
                axios({
                    method : 'post',
                    url : '/token/refresh/',
                    data : { 'refresh' : window.localStorage.getItem('refresh') }
                })
                .then(res => {window.localStorage.setItem('access', JSON.parse(res.request.response).access)})
                setError(false)
            if(axios.isCancel(err)) return;
            setData(1)
            console.log(err.request)
        })
        return () => cancel()
    }, [startPos, page, username, Username])

    return {loading, error, Data, hasMore}
}