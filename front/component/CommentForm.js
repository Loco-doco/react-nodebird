import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Form, Input, Button } from 'antd';
import { useInputSetter } from '../hooks/useInput'

const CommentFormWrapper = styled(Form.Item)`
    position: relative;
    margin: 0px;
`

const CommentFormButtonWrapper = styled(Button)`
    position: absolute;
    right: 0px;
    bottom: -40px;
`

const CommentForm = ({ post }) => {

    const id = useSelector((state) => state.user.user?.id)
    const [commentText, setCommentText, onChangeCommentText] = useInputSetter('')
    const onSubmitComment = useCallback(()=>{
        console.log(post.id, commentText);
    }, [commentText])

    return(
        <Form onFinish={onSubmitComment}>
            <CommentFormWrapper>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <CommentFormButtonWrapper type="primary" htmlType="submit"> 삐약 </CommentFormButtonWrapper>
            </CommentFormWrapper>
        </Form>
    )

    // return(
    //     <Form onFinish={onSubmitComment}>
    //         <Form.Item style={{margin: 0}}>
    //             <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
    //             <Button style={{right: 0, bottom: -40}} type="primary" htmlType="submit"> 삐약 </Button>
    //         </Form.Item>
    //     </Form>
    // )
}

CommentForm.propTypes={
    post : PropTypes.object.isRequired
}

export default CommentForm;