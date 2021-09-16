import axios from 'axios';
import { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux'
import { render, unmountComponentAtNode } from 'react-dom';
import { store } from '../../../store/index_Reducer'
import { Provider } from 'react-redux';
import Overlay from '../Overlay';
import { addPostsAtFront_Action } from '../../../store/postReducer'
import errorImgPNG from '../../images/errorImg.png'

function CreatePostForm({idRed, beingRedacted, setBeingRedacted, content, imagesRed, me, post, postID, parentID, setColor, setPost, lastPostID}) {
    const dispatch = useDispatch()
    const access = window.localStorage.getItem('access');
    if(access) axios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
    const [postWarning, setPostWarning] = useState('');
    const smiles = ['🔥', '🤡', '💩', '✋', '👍', '🤜', '🤛', '👏', '👀', '🗿', '🚬'];

    const [filesArray, setFilesArray] = useState(imagesRed !== undefined ? imagesRed : []);
    const [imagesBlob, setImagesBlob] = useState(imagesRed !== undefined ? imagesRed : []);
    const [deletedFilesArray, setDeletedFilesArray] = useState([]);
    const [wasNewImageAdded, setWasNewImageAdded] = useState(false);
    const [newPostContent, setNewPostContent] = useState(content !== undefined ? content : '');
    
    const clearForm = () => {
        setFilesArray([])
        setImagesBlob([])
        setDeletedFilesArray([])
        setWasNewImageAdded(false)
        setNewPostContent('')
    }

    const closeSmileListener = () => {
        function closeSmile(){
            setSmile(false);
            window.removeEventListener('click', closeSmile)
        }
        window.addEventListener('click', closeSmile)
    }
    const [smile, setSmile] = useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const getName = (authorUsername, firstName, lastName) => {
        if(firstName === '' && lastName === '') return authorUsername;
        if(firstName !== '' && lastName === '') return firstName;
        if(firstName === '' && lastName !== '') return lastName;
        if(firstName !== '' && lastName !== '') return firstName + ' ' + lastName;
    }
    const handleInput = (event) => {
        const imgBlobArray = Array.from(event.target.files).map(img => URL.createObjectURL(img))
        Array.from(event.target.files).forEach(file => {
            setFilesArray(p => p.concat(file).splice(0,6))
        })
        setImagesBlob(p => p.concat(imgBlobArray).splice(0,6))
        setWasNewImageAdded(true);
    }

    const openImage = (imagesBlob, index) => {
        dispatch({type : 'CHANGE_DATA__OVERLAY', payload : {
            overlayVisibility : true,
            overlayImage : index,
            overlayImages : imagesBlob
        }})
        render(<Provider store={store} ><Overlay/> </Provider>, document.getElementById('portal'))
    }

    const [loading, setLoading] = useState(false)
    const editPost = (id) => {
        if(!loading){
            setLoading(true)
            const formData = new FormData();
            formData.append('content', newPostContent);
            filesArray.forEach(file => {
                if(!file.image && formData.getAll('images').length < 7) formData.append('image', file)
            })
            deletedFilesArray.forEach(fileID => {
                formData.append('deleted', fileID)
            })
            const url = post ? '/api/v1/posts/' : '/api/v1/comments/';
            axios.put(url + id, formData)
            .then(() => {
                clearForm()
                axios.get(url + id).then(res => {
                    setPost(res.data)
                    setLoading(false)
                    setBeingRedacted(false);
                }).catch(e => {})
            })
            .catch(err => { errorCase(err) })
        }
    }
    const b = document.getElementById('b')

    const getNewPosts = (i) => {
        axios.get('/api/v1/posts/?startpos='+0+'&endpos='+i)
        .then((res) => {
            unmountComponentAtNode(b)
            dispatch( addPostsAtFront_Action(res.data) )
        })
    }
    const createPost = () => {
        const formData = new FormData();
        formData.append('content', newPostContent);
        if(!post){    
            formData.append('post', postID)
            formData.append('parent', parentID)
        }else   
            filesArray.forEach(file => {
                formData.append('image', file)
            })
        const url = post ? '/api/v1/posts/' : '/api/v1/comments/';
        axios.post(url, formData)
        .then(() => {
            clearForm()
            if(post){
                axios.post('/api/v1/posts/listener/', {
                    'last_id' : lastPostID+''
                }).then((res) => {
                    const np = res.data.new_posts;
                    if (np > 0)
                        render(
                            <button id='showNewPostsButton' className='post' onClick={() => getNewPosts(np)}>
                                View <span id='newPostsCounter'>{np}</span> new Shets
                            </button>, b)
                })
                .catch(err => console.log(err.response))
            }
            else document.location.reload()
            setLoading(false)
            if(beingRedacted) setBeingRedacted(false);
        })
        .catch(err => { errorCase(err) })
    }

    const errorCase = (err) => {
        setLoading(false)
        console.log(err)
        const res = JSON.parse(err.request.response);
        console.log(res);
        setColor(1)
        if(res.detail === 'Post must contain 'content' field' || res.detail === 'No 'content' field or no POST request'){
            post ? setPostWarning('Post must have a content') : setPostWarning('Comment must have a content');
            return;
        }
        if(res.detail === 'Too big images uploaded. Maximum size is 2 MB'){
            setPostWarning(res.detail)
            return;
        }
        setPostWarning('Something went wrong');
    }

    const keyListenerCP = () => {
        function SearchCP(e){
            document.removeEventListener('keydown', SearchCP)
            if(e.keyCode === 27) setBeingRedacted(false)
        }
        document.addEventListener('keydown', SearchCP)
    }
    return (
            <>
                {me.id !== undefined ? 
                    <>
                        {beingRedacted ? keyListenerCP() : null}
                        <div className='postInner'>
                            <div className='authorAvatarBlock'>
                                    <img className='authorAvatar' src={me.profile_photo} onError={(e)=>{e.target.onerror = null; e.target.src=errorImgPNG}} alt='avatar'/>
                            </div>
                            <div className='postBlock'>
                                <div>
                                    <span className='Username'>
                                        {getName(me.username, me.first_name, me.last_name)}
                                    </span><span className='tag'>@{me.username}</span>
                                </div>
                                <div className='postContent'>
                                    <textarea className='newPostInput' placeholder='What's up ?' value={newPostContent} onChange={val => {setNewPostContent(val.target.value); setPostWarning('')}} onClick={e => {e.stopPropagation(); e.preventDefault();}} maxLength={post ? '400' : '200'} />             
                                    <button className='smileButton' onClick={e => {e.stopPropagation(); e.preventDefault(); closeSmileListener(); setSmile(p => !p)}}></button>
                                </div>
                                {post ? 
                                    <div className={'postImages n_'+imagesBlob.length}>
                                        {imagesBlob.map((image, index) => (                                        
                                            <div key={index} className={'newPostImage n_' + imagesBlob.length} style={{backgroundImage: `url(${image.image ? image.image : image})`}}
                                            onClick={e => {e.stopPropagation(); e.preventDefault(); openImage(imagesBlob, index)}}>
                                                <button className='removeImageBtn' onClick={e => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    const tempFiles = filesArray;
                                                    tempFiles.splice(index, 1);
                                                    setFilesArray(tempFiles);
                                                    if(wasNewImageAdded){
                                                        const tempImagesBlob = imagesBlob;
                                                        tempImagesBlob.splice(index, 1);
                                                        setImagesBlob(tempImagesBlob);
                                                    }
                                                    image.id ? setDeletedFilesArray(p => p.concat(image.id)) : setDeletedFilesArray(p => p)
                                                    forceUpdate()
                                                    }}>X</button>
                                            </div>))
                                        }
                                    </div>
                                : ''}                               
                            </div>
                        </div>
                        <div className='newPostSettings'>
                            {post ? 
                                <label onClick={e => {e.stopPropagation();}}>
                                    <label className='addImageLabel' onClick={e => {e.stopPropagation();}}>
                                        <input accept='image/jpg, image/jpeg, image/png' type='file' className='addImageInput' onClick={(event) => event.target.value = null} onChange={handleInput} multiple /> 
                                    </label>
                                </label>
                            : ''}
                            <div>
                                <span style={{color : 'red'}}>{postWarning}</span>
                            </div>
                            <button className='newPostButton' onClick={createPost}>Shet</button>
                            {beingRedacted ? <>
                                <button className='newPostCancelButton' onClick={e => {e.stopPropagation(); e.preventDefault(); setBeingRedacted(false)}}>Cancel</button>
                                <button className='newPostButton' onClick={e => {e.stopPropagation(); e.preventDefault(); editPost(idRed)}}>Shet</button>
                            </> :  <button className='newPostButton' onClick={createPost}>Shet</button>}
                        </div>
                        {smile ? <div className='smilesHolder'>{}
                            {smiles.map(emoji => 
                                <button key={emoji} onClick={e => {e.stopPropagation(); e.preventDefault(); setNewPostContent(p => p + emoji)}}>{emoji}</button>
                            )}
                        </div> : ''}
                    </>
                : ''}
            </>
    )
}

export default CreatePostForm
