import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Form, Input, Button } from "antd";
import { useInputSetter } from "../hooks/useInput";

import { ADD_COMMENT_REQUEST } from "../reducers/actions";

const CommentFormWrapper = styled(Form.Item)`
  position: relative;
  margin: 0px;
`;

const CommentFormButtonWrapper = styled(Button)`
  position: absolute;
  right: 0px;
  bottom: -40px;
  z-index: 1;
`;

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.user?.id);
  const { isAddCommentRequest, isAddCommentSuccess } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAddCommentSuccess) {
      setCommentText("");
    }
  }, [isAddCommentSuccess]);

  const [commentText, setCommentText, onChangeCommentText] = useInputSetter("");
  const onSubmitComment = useCallback(() => {
    console.log(`commentText = ${commentText}`);
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <CommentFormWrapper>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <CommentFormButtonWrapper
          type="primary"
          htmlType="submit"
          loading={isAddCommentRequest}
        >
          삐약
        </CommentFormButtonWrapper>
      </CommentFormWrapper>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
