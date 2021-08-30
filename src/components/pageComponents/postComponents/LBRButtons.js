import { useState } from 'react';
import axios from 'axios';

function LBRButtons({id, myUsername, isBookmarked, isLiked, likesCount, isPost, button}) {
    const [likes, setLikes] = useState(likesCount);
    const [isLikedT, setIsLikedT] = useState(isLiked);
    const [isBookmarkedT, setIsBookmarkedT] = useState(isBookmarked);
    const access = window.localStorage.getItem("access");
    if(access) axios.defaults.headers.common['Authorization'] = "Bearer " + access;

    const like = (id) => {
        if(myUsername){
            setIsLikedT(p => !p)
            if(isLikedT) setLikes(p => p-1)
            else setLikes(p => p+1)
            const url = isPost ? "api/v1/posts/" : "api/v1/comments/"
            axios({
                method : 'post',
                url : url + id + "/like/",
                headers : {
                    'Authorization' : 'Bearer ' + window.localStorage.getItem('access')
                }
            })
            .then(() => {})
            .catch(err => console.log(err.request))
        }
    }

    const addToBookmarks = (id) => {
        if(myUsername){
            setIsBookmarkedT(p => !p)
            const url = isPost ? "api/v1/posts/" : "api/v1/comments/"
            axios({
                method : 'post',
                url : url + id + "/bookmark/",
                headers : {
                    'Authorization' : 'Bearer ' + window.localStorage.getItem('access')
                }
            })
            .then(() => {})
            .catch(err => console.log(err))
        }
    }
    return (
        <>
            {button === 0 ? <button id={"likeBtn_" + id} className={isLikedT ? "like_btn active" : "like_btn"} onClick={e => {e.stopPropagation(); e.preventDefault(); like(id)}}>{likes}</button> : ""}
            {button === 1 ? <button id={"addToBookmarkBtn_" + id} className={isBookmarkedT ? "addToBookmark_btn active" : "addToBookmark_btn"} onClick={e => {e.stopPropagation(); e.preventDefault(); addToBookmarks(id)}}> </button> : ""}
        </>
    )
}

export default LBRButtons
