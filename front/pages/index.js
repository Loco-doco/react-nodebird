import React from 'react'
import AppLayout from '../component/AppLayout'
import { useSelector } from 'react-redux'
import PostCard from '../component/PostCard'
import PostForm from '../component/PostForm'

const Home = () => {
    const isLoggedIn = useSelector((state) => {
        return state.user.isLoggedIn
    })

    const mainPosts = useSelector((state) => {
        return state.post.mainPosts
    })
0
    return (
        <div>
            <AppLayout>
                <div> 하이염 </div>
                {isLoggedIn && <PostForm />}
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