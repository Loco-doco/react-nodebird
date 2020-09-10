import React, { useCallback, useState, useRef} from 'react';
import {Form, Input, Button} from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post'

const PostFormWrapper = styled(Form)`
    margin: 10px 10px 20px;
`

const PostForm = () => {

    const { imagePaths } = useSelector((state)=>state.post)
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const imageInput = useRef();

    const onClickImageUpload = useCallback(() => {
        console.log('clicked!')
        imageInput.current.link.click();
      }, [imageInput.current]);

    const onChangeText = useCallback((e)=> {
        setText(e.target.value)
    }, [])

    const onSubmit = useCallback(() => {
        dispatch(addPost)
    }, [])

    return(
        <PostFormWrapper encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea 
                value={text} 
                onChange={onChangeText} 
                maxLength={140} 
                placeholder="포스트게니킴"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit">짹짹쨱</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{display: 'inline-block'}}>
                        <img src={v} style={{width: '200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </PostFormWrapper>
    );

};

export default PostForm;
