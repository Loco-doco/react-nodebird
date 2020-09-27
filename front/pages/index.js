import React from 'react'
import AppLayout from '../component/AppLayout'
import { useSelector } from 'react-redux'
import PostCard from '../component/PostCard'
import PostForm from '../component/PostForm'

const Home = () => {
    const isLoginSuccess = useSelector((state) => {
        return state.user.isLoginSuccess
    })

    const mainPosts = useSelector((state) => {
        return state.post.mainPosts
    })
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