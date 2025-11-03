import React, { useState } from "react";
import TextInput from "../../components/form/TextInput";
import { createSpaceApi } from "../../api/sehomanagerapi";
import ConfirmButton from "../../components/form/ConfirmButton";
import { SpaceRequestType } from "../../types/type";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  PageIconAndNameWrapper,
  Title,
  Wrapper,
} from "../../components/pages-style/PageStyle";
import { FaSpaceAwesome } from "react-icons/fa6";

const SpaceCreatePage = () => {
  const { workspaceId } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const OnCreateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const data: SpaceRequestType = {
      name,
      slug,
    };

    createSpaceApi(Number(workspaceId), data)
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
          <PageIconAndNameWrapper
            icon={<FaSpaceAwesome />}
            name="스페이스 생성"
          />
        </Title>
        <TextInput
          name="name"
          title="스페이스 이름"
          data={name}
          setData={setName}
        />
        <TextInput name="slug" title="슬러그" data={slug} setData={setSlug} />
        <ConfirmButton title="생성" onClick={OnCreateSubmit} />
      </Wrapper>
    </Container>
  );
};

export default SpaceCreatePage;
