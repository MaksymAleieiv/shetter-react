import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useDispatch} from 'react-redux'
import axios from 'axios';

export default function PostsLoader(startPos, page, setStartPos = null, Username = null) {
    const dispatch = useDispatch()
    const access = window.localStorage.getItem("access");
    if(access) axios.defaults.headers.common['Authorization'] = "Bearer " + access;
    const { username } = useParams();
    const { comment_id } = useParams()
    const [prevUser, setPrevUser] = useState("");
    const { post_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [prevPage, setPrevPage] = useState(0);

    useEffect(() => {
        let cancel;
        let url;
        if((page !== prevPage && !"3689".includes(page)) || (username !== prevUser && username !== undefined)) dispatch({type : "CLEAR_POSTS"})
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
            case 11 : url = "/api/v1/my_subscriptions/?startpos="+startPos+"&endpos="+(startPos+15); break;
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
            function f(data, key){
                return [
                    ...new Map(
                        data.map(x => [key(x), x])
                    ).values()
                ]
            }
            console.log(username)
            if(page === 3 || page === 9){
                if(Username !== null && prevUser !== "" && prevUser !== username){
                    setStartPos(0);
                    dispatch({type : "REWRITE_COMMENTS", payload : res.data.id !== undefined ? res.data : [...res.data]})
                }else 
                    dispatch({type : "REWRITE_COMMENTS", payload : res.data.id !== undefined ? res.data : [...res.data]})
            }
            else if(prevPage !== page || page === 6 || page === 8) {
                if(Username !== null && prevUser !== "" && prevUser !== username){
                    setStartPos(0);
                    dispatch({type : "REWRITE_POSTS", payload : res.data.id !== undefined ? res.data : [...res.data]})
                }else 
                    dispatch({type : "REWRITE_POSTS", payload : res.data.id !== undefined ? res.data : [...res.data]})
            }
            else if(page === 10) dispatch({type : "ADD_POSTS", payload : f([...res.data], i => i.id)})
            else dispatch({type : "ADD_POSTS", payload : [...res.data]})
            setPrevPage(page)
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
            console.log(err)
        })
        return () => cancel()
    }, [startPos, page, username, Username])

    return {loading, error, hasMore}
}