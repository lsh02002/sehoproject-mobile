import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../components/form/TextInput";
import {
    createWorkspaceApi,  
} from "../../api/sehomanagerapi";
import ConfirmButton from "../../components/form/ConfirmButton";
import { workspaceRequestType } from "../../types/type";
import { toast } from "react-toastify";

const WorkspaceCreatePage = () => {  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const OnCreateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {    
    e.stopPropagation();

    const data: workspaceRequestType = {
      name,
      slug,
    };

    createWorkspaceApi(data)
      .then((res) => {
        console.log(res);
        toast.success("생성을 성공했습니다!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h3>워크스페이스 생성</h3>
        </Title>
        <TextInput
          name="name"
          title="워크스페이스 이름"
          data={name}
          setData={setName}
        />
        <TextInput name="slug" title="슬러그" data={slug} setData={setSlug} />
        <ConfirmButton title="생성" onClick={OnCreateSubmit} />
      </Wrapper>
    </Container>
  );
};

export default WorkspaceCreatePage;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 500;
  }

  a {
    font-size: 0.7rem;
  }
`;
