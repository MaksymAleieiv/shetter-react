import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { addPostsAtFront_Action } from '../../store/postReducer'
import { useDispatch } from 'react-redux'

function NewPostsButton({lastID}) {
    const dispatch = useDispatch()
    const b = document.getElementById('b');

    const getNewPosts = (i) => {
        axios.get('/api/v1/posts/?startpos='+0+'&endpos='+i)
        .then((res) => {
            unmountComponentAtNode(b)
            dispatch( addPostsAtFront_Action(res.data) )
        })
    }

    const newPostListener = (id) => {
        window.newPostsListener = setInterval(() => {
            if(document.title !== 'Home') return window.clearInterval(window.newPostsListener);
            axios.post('/api/v1/posts/listener/', {
                'last_id' : id + ''
            })
            .then((res) => {
                const np = res.data.new_posts;
                if (np > 0)
                    render(
                        <button id='showNewPostsButton' className='post' onClick={() => getNewPosts(np)}>
                            View <span id='newPostsCounter'>{np}</span> new Shets
                        </button>, b)
            })
            .catch(err => {})
        }, 1000 * 45)
    }
    
    useEffect(() => {
        if(window.newPostsListener !== undefined ){
            window.clearInterval(window.newPostsListener);
        }
        if(lastID){
            newPostListener(lastID.id)
        }
        return () => {
            window.clearInterval(window.newPostsListener)
        }
    }, [lastID])

    return (
        <div id='b'>
            
        </div>
    )
}

export default NewPostsButton