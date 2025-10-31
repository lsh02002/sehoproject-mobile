import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../components/form/TextInput";
import {
  getOneWorkspaceApi,
  putOneWorkspaceApi,
} from "../../api/sehomanagerapi";
import ConfirmButton from "../../components/form/ConfirmButton";
import { WorkspaceRequestType } from "../../types/type";
import { toast } from "react-toastify";
import { Container, Title, Wrapper } from "../../components/pages-style/PageStyle";

const WorkspaceEditPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    getOneWorkspaceApi(Number(id))
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setSlug(res.data.slug);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const OnEditSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {    
    e.stopPropagation();

    const data: WorkspaceRequestType = {
      name,
      slug,
    };

    putOneWorkspaceApi(Number(id), data)
      .then((res) => {
        console.log(res);
        toast.success("수정을 성공했습니다!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h3>워크스페이스 수정</h3>
        </Title>
        <TextInput
          name="name"
          title="워크스페이스 이름"
          data={name}
          setData={setName}
        />
        <TextInput name="slug" title="슬러그" data={slug} setData={setSlug} />
        <ConfirmButton title="수정" onClick={OnEditSubmit} />
      </Wrapper>
    </Container>
  );
};

export default WorkspaceEditPage;

