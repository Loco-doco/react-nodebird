import React from "react";
import { Form, Input } from "antd";
import styled from "styled-components";

const NicknameEditFormWrapper = styled(Form)`
  border: 1px solid #d9d9d9;
  padding: 20px;
  margin-bottom: 10px;
`;

const NicknameEditForm = () => {
  return (
    <NicknameEditFormWrapper>
      <Input.Search addonBefore="닉네임" enterButton="edit" />
    </NicknameEditFormWrapper>
  );
};

export default NicknameEditForm;
