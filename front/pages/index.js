import React, { useEffect } from 'react'
import AppLayout from '../component/AppLayout'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../component/PostCard'
import PostForm from '../component/PostForm'
import { LOAD_POST_REQUEST } from '../reducers/actions'

const Home = () => {
    const dispatch = useDispatch();
    const isLoginSuccess = useSelector((state) => {
        return state.user.isLoginSuccess
    })

    const { mainPosts, hasMorePost, isLoadPostRequest } = useSelector((state) => {
        return state.post
    })

    useEffect(() => {
        dispatch({
            type: LOAD_POST_REQUEST
        })
    }, [])

    useEffect(() => {
        function onScroll() {
            // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 300){
                console.log(`hasMorePost is ${hasMorePost}`)
                console.log(`current length is ${mainPosts.length}`)
                if (hasMorePost && !isLoadPostRequest){
                    dispatch({
                       type: LOAD_POST_REQUEST
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [hasMorePost, isLoadPostRequest ])

0
    return (
        <div>
            <AppLayout>
                <div> 하이염 </div>
                {isLoginSuccess && <PostForm />}
                {mainPosts.map((c)=> {
                    return (
                        <PostCard key={c.id} post={c} />
                    )})
                }
            </AppLayout>
        </div>
    )
}

export default Home;