import React, { useCallback, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {Button, Card, Popover, Avatar, List, Comment} from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined, MessageFilled } from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/actions';
import FollowButton from './FollowButton';

const PostCard = ( { post }) => {
    // console.log('(PostCard.js) post.content=', post.content)
    const dispatch = useDispatch();
    const { isRemovePostRequest } = useSelector((state) => state.post)

    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(()=> {
        setLiked((state) => !state)
    },[]);
    const onToggleComment = useCallback(()=> {
        setCommentFormOpened((state) => !state)
    },[]);

    const id = useSelector((state) => state.user.user?.id);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id
        })
    }, [])

    return(
        <div style={{ marginBottom: 20 }}>
            <Card
                cover={ post.Images[0] && <PostImages images={post.Images} /> }
                actions = {[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#ebf96" key = "Heart" onClick={onToggleLike} />
                        : <HeartOutlined key = "Heart" onClick={onToggleLike} />,
                    commentFormOpened
                        ? <MessageFilled key = "commentOpened" onClick={onToggleComment} />
                        : <MessageOutlined key = "commentClosed" onClick={onToggleComment}/>,
                    <Popover key = "more" content={(
                        <ButtonGroup>
                            {id && post.User.id === id ? ( // id를 가져왔고(=상태값이 true고), id와 포스트의 id가 같으면, 수정과 삭제가 표시되고, 아니면 신고가 표시됨 
                                <>
                                <Button>수정</Button>
                                <Button type="danger" loading = {isRemovePostRequest} onClick={onRemovePost}>삭제</Button>
                                </>
                            ) : <Button>신고</Button> }
                        </ButtonGroup>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
                extra = {id && <FollowButton post = {post} />}
            >
                <Card.Meta 
                    avatar = {<Avatar>{post.User.nickname[0]}</Avatar>}
                    title = {post.User.nickname}
                    description = {<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post}/>
                    <List 
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout = "horizontal"
                        dataSource = {post.Comments}
                        renderItem={(item)=>(
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
        </div>
        // <CommentForm />
        // <Comments />
    )
};

PostCard.propTypes = {

    post : PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        Images: PropTypes.arrayOf(PropTypes.object),
        Comments: PropTypes.arrayOf(PropTypes.any),
        createdAt: PropTypes.arrayOf(PropTypes.any),
    }).isRequired

}

export default PostCard;