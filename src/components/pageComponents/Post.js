import { Link } from 'react-router-dom';
import PostSettings from './postComponents/PostSettings';
import { useState, useRef, useEffect, memo } from 'react';
import { createPortal, render } from 'react-dom';
import CreatePostForm from './postComponents/CreatePostForm';
import LBRButtons from './postComponents/LBRButtons';
import { useDispatch } from 'react-redux'
import { store } from '../../store/index_Reducer'
import { Provider } from 'react-redux';
import Overlay from './Overlay';
import errorImgPNG from '../images/errorImg.png'
import { toggleSelectedPosts_Action, toggleSelectedComments_Action } from '../../store/selectedPostsReducer'


const Post = memo(({post, isPost, me}) => {
    console.log('post rerendered')
    const dispatch = useDispatch();

    const [postP, setPostP] = useState(post);
    const setPostFromChild = (c) => setPostP(c)
    
    const [settingVisibility, setSettingVisibility] = useState(false);
    const setSettingVisibilityFromChild = (c) => setSettingVisibility(c)

    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)

    const [beingRedacted, setBeingRedacted] = useState(false);
    const setBeingRedactedFromChild = (c) => setBeingRedacted(c)

    const id = postP.id
    const authorUsername = postP.user.username
    const isLiked = postP.is_fan
    const firstName = postP.user.first_name 
    const lastName = postP.user.last_name 
    const authorAvatar = postP.user.profile_photo
    const content = postP.content
    const images = postP.images 
    const datePosted = postP.pub_date 
    const lastEdited = postP.last_edited
    const commentsCount = postP.comments_count
    const likesCount = postP.total_likes
    const isBookmarked = postP.is_booked
    const getName = (authorUsername, firstName, lastName) => {
        if(firstName === '' && lastName === '') return authorUsername;
        if(firstName !== '' && lastName === '') return firstName;
        if(firstName === '' && lastName !== '') return lastName;
        if(firstName !== '' && lastName !== '') return firstName + ' ' + lastName;
    }
    const getTime = (datePosted, lastEdited) => {
        function timeSince(date) {
            const seconds = Math.floor((new Date() - date) / 1000);   
            const interval = seconds / 31536000;     
            if (interval > 1) return Math.floor(interval) + ' years ago';
            const interval1 = seconds / 2592000;
            if (interval1 > 1) return Math.floor(interval1) + ' months ago';
            const interval2 = seconds / 86400;
            if (interval2 > 1) return Math.floor(interval2) + ' days ago';
            const interval3 = seconds / 3600;
            if (interval3 > 1) return Math.floor(interval3) + ' hours ago';
            const interval4 = seconds / 60;
            if (interval4 > 1) return Math.floor(interval4) + ' minutes ago';
            return ' just now';
          }
        const date = timeSince(new Date(new Date(datePosted)))
        const last_edited = timeSince(new Date(new Date(lastEdited)))
        return (date === last_edited) ? date : date+' (Edited: '+ last_edited +')';
    }
  
    const openImage = (imagesBlob, index) => {
        dispatch({type : 'CHANGE_DATA__OVERLAY', payload : {
            overlayVisibility : true,
            overlayImage : index,
            overlayImages : imagesBlob
        }})
        render(<Provider store={store} ><Overlay/> </Provider>, document.getElementById('portal'))
        //createPortal(<h1>xxx</h1>, document.getElementById('portal'))
    }

    useEffect(() => {
        const closeSettings = () => {
            setSettingVisibility(false);
            setSelected(false)
        }
        window.addEventListener('click', closeSettings)
        return () => {
            window.removeEventListener('click', closeSettings)
        }
    }, [])

    const colorFunc = (c) => {
        if(postWarningColor !== 0)setTimeout(() => setColor(0), 500)
        switch(c){
            case 0 : return 'post'
            case 1 : return 'post error'
            case 2 : return 'post copy'
            default : return 'post'
        }
    }
    const [selected, setSelected] = useState(false)
    const initPress = useRef(null)
    const onLongPress = () => {
        if(document.title === me.username){
            if(Date.now() - initPress.current > 150){
                console.log(isPost)
                if(isPost) {
                    dispatch( toggleSelectedPosts_Action(id) )
                }else{
                    dispatch( toggleSelectedComments_Action(id) )
                }
                setSelected(p => !p) 
            }  
        }
    }
    
    return (
        <>
            <div className={colorFunc(postWarningColor)} id={'post_' + id} style={selected ? {background: 'lightblue'} : {background: 'white'}} 
            onClick={e => {if(Date.now() - initPress.current > 150){e.preventDefault(); e.stopPropagation();}}}
            onMouseDown={() => initPress.current = Date.now()} onMouseUp={() => onLongPress()}>
                {beingRedacted ? 
                    <>
                        <CreatePostForm idRed={id} beingRedacted={beingRedacted} setBeingRedacted={setBeingRedactedFromChild} 
                        content={content} imagesRed={images} me={me} setPost={setPostFromChild} post={isPost} parentID={null}
                        setColor={setColorFromChild}/>
                    </> 
                    :
                    <>        
                        <div className='postInner'>
                            <div className='authorAvatarBlock'>
                                <Link to={'/user/' + authorUsername}>
                                    <img className='authorAvatar' src={authorAvatar} onError={(e)=>{e.target.onerror = null; e.target.src=errorImgPNG}} alt=''/>
                                </Link>
                            </div>
                            <div className='postBlock'>
                                <div>
                                    <Link className='Username' to={'/user/' + authorUsername}>
                                        {getName(authorUsername, firstName, lastName)}
                                    </Link><span className='tag'>@{authorUsername} · {getTime(datePosted, lastEdited)}</span>
                                </div>
                                    <div className='postContent' id={'postContent_'+id} onClick={e => {e.preventDefault();}}>
                                        {content}
                                    </div>
                                    {isPost && 
                                        <div className={'postImages n_'+images.length} id={'postImages_' + id}>
                                        {images.map((image, index) => (
                                            <div key={image.image} className={'postImage n_'+images.length} onClick={e => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                openImage(images, index);
                                            }} style={{backgroundImage : `url(${image.image ? image.image : image})`}}></div>
                                        ))}
                                    </div>
                                    }                                  
                                    <div className='other'>
                                        <Link to={ isPost ? '/post/' + id : '/comment/' + id}>
                                            <button id={'commentBtn_' + id} className='comment_btn'>{commentsCount}</button>
                                        </Link>
                                        <button id={'repostBtn_' + id} className='repost_btn'>0</button>
                                        <LBRButtons id={id} isLiked={isLiked} isPost={isPost} likesCount={likesCount} myUsername={me && me.username} button={0}/>
                                        <LBRButtons id={id} isBookmarked={isBookmarked} isPost={isPost} myUsername={me && me.username} button={1}/>
                                    </div>
                            </div>
                            <button className='postSettingsButton' onClick={e => {e.preventDefault(); e.stopPropagation(); setSettingVisibility(p => !p)}}>···</button>
                        </div>
                        {settingVisibility && 
                            <PostSettings post={isPost} myUsername={me.username} userProfileSettings={false} username={authorUsername} id={id}
                            setBeingRedacted={setBeingRedactedFromChild} setSettingVisibility={setSettingVisibilityFromChild} setColor={setColorFromChild}/>
                        }
                       
                    </>
                }
            </div>      
        </>
    )
})

export default Post
