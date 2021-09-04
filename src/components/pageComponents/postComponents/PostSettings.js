import axios from "axios";
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function PostSettings({username, myUsername, id, setDeleted, setBeingRedacted, post, userProfileSettings, setSettingVisibility, setColor}) {
    const dispatch = useDispatch()
    const access = window.localStorage.getItem("access");
    if(access) axios.defaults.headers.common['Authorization'] = "Bearer " + access;

    const [removeConfirm, setConfirm] = useState(false);

    const editPost = (id) => {
        setSettingVisibility(false)
        setBeingRedacted(true)
    }
    const removePost = (id) => {
        axios({
            method : 'delete',
            url :  post ? '/api/v1/posts/' + id : '/api/v1/comments/' + id
        })
        .then(() => {
            dispatch({type : "DELETE_POST", payload : id})
            if(document.title === "Single Post")
                document.location = "/"
            setDeleted(true)
        })
        .catch(e => {})
    }
   
    return (
        <>
            {userProfileSettings ? 
                <div className={myUsername ? "postSettingsProfile postSettings" : " postSettingsProfile postSettings oneChildSettings"}>
                    <ul>   
                        <li>
                            <button className="dropDown__listItem copyLink" onClick={e => {e.stopPropagation(); e.preventDefault(); setColor(2); navigator.clipboard.writeText("https://react-shitter.herokuapp.com/user/"+username); setSettingVisibility(false)}}><span>Copy link to profile</span></button>
                        </li>
                        {myUsername && myUsername !== username ? 
                            <>
                                <li>
                                    <button className="dropDown__listItem followUser"><span>Follow @{username}</span></button>
                                </li>
                                <li>
                                    <button className="dropDown__listItem blockUser"><span>Block @{username}</span></button>
                                </li>
                            </>
                        : ""}
                    </ul>
                </div>
            :
                <>
                    {removeConfirm ?
                        <div className="postSettings">
                            <div className="deletePostHolder">
                                <div className="deletePostHolder__text">
                                    Are you sure you want to delete <br/> this forever ?
                                </div>
                                <div className="deletePostHolder__buttons">
                                    <button className="deletePostCancelButton" onClick={e => {e.stopPropagation(); e.preventDefault(); setConfirm(false)}}>Cancel</button>
                                    <button className="deletePostButton" onClick={e => {e.stopPropagation(); e.preventDefault(); removePost(id)}}>Delete</button>
                                </div>
                            </div>
                        </div>
                    :
                        <div className={myUsername ? "postSettings" : "postSettings oneChildSettings"}>
                            <ul>   
                                <li>
                                    <button className="dropDown__listItem copyLink" onClick={e => {e.stopPropagation(); e.preventDefault(); setColor(2); 
                                            post ? navigator.clipboard.writeText("https://react-shitter.herokuapp.com/post/"+id) : navigator.clipboard.writeText("https://react-shitter.herokuapp.com/comment/"+id)
                                            setSettingVisibility(false)}}><span>Copy link to this Shet</span></button>
                                </li>
                                {myUsername && myUsername !== username ? 
                                    <>
                                        <li>
                                            <button className="dropDown__listItem followUser"><span>Follow @{username}</span></button>
                                        </li>
                                        <li>
                                            <button className="dropDown__listItem blockUser"><span>Block @{username}</span></button>
                                        </li>
                                    </>
                                : ""}
                                {username === myUsername ? 
                                    <>
                                        <li>
                                            <button className="dropDown__listItem editPost" onClick={e => {e.stopPropagation(); e.preventDefault(); editPost(id)}}><span>Edit this Shet</span></button>
                                        </li>
                                        <li>
                                            <button className="dropDown__listItem red removePost" onClick={e => {e.stopPropagation(); e.preventDefault(); setConfirm(true)}}><span className="red">Delete this Shet</span></button>
                                        </li>
                                    </>
                                : ""}
                            </ul>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default PostSettings
